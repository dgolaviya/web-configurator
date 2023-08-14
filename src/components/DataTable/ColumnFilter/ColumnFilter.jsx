import React, { forwardRef, useImperativeHandle } from "react";
import "./styles.scss";

const ColumnFilter = forwardRef(
  ({ fetchGridData, filterChangedCallback, ...props }, ref) => {
    const [filter, setFilter] = React.useState({
      filterCondition: "Contains",
      value: null,
    });

    React.useEffect(() => {
      if (filter.value !== null) {
        fetchGridData();
      }
    }, [filter.value]);

    React.useEffect(() => {
      if (filter.value) {
        fetchGridData();
      }
    }, [filter.filterCondition]);

    useImperativeHandle(ref, () => ({
      isFilterActive() {
        return filter.value;
      },
      doesFilterPass() {
        return true;
      },
      getModel() {
        if (filter.value) {
          return filter;
        }
        return undefined;
      },
      setModel(model) {
        if (model != null) {
          setFilter(model[props.colDef.field]);
        }
      },
    }));

    const handleSelection = (event) => {
      if (filter.filterText) {
        const appliedFilters = props.api.getFilterModel();
        appliedFilters[props.colDef.field] = {
          [props.colDef.field]: {
            ...filter,
            filterCondition: event.currentTarget.value,
          },
        };
      }
      setFilter({ ...filter, filterCondition: event.currentTarget.value });
    };
    const handleTextInput = (event) => {
      const appliedFilters = props.api.getFilterModel();
      appliedFilters[props.colDef.field] = {
        [props.colDef.field]: { ...filter, value: event.currentTarget.value },
      };
      setFilter({ ...filter, value: event.currentTarget.value });
    };
    return (
      <div className="column-filter">
        <select
          className=" column-filter-select mb-5"
          onChange={handleSelection}
          value={filter.filterType}
        >
          <option className=" column-filter-option" value="Contains">
            Contains
          </option>
          <option className=" column-filter-option" value="Not contains">
            Not contains
          </option>
        </select>
        <input
          type="text"
          className="column-filter-input"
          onChange={handleTextInput}
          value={filter.filterText}
          placeholder="Filter..."
        />
      </div>
    );
  }
);

export default ColumnFilter;
