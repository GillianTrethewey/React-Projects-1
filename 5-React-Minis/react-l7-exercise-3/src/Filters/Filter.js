import React from "react";
import { hotels } from "../data.js";

const getMatchCount = (filterKey) =>
  hotels.filter((hotel) => hotel[filterKey]).length;

const Filter = (props) => {
  /* call props.toggleFilter with an argument that indicates WHICH input has been clicked*/
  const onChange = () => props.toggleFilter(props.filter.key);
  const matchCount = getMatchCount(props.filter.key);
  return (
    <li className="filter">
      <span>
        <input
          type="checkbox"
          checked={props.isChecked}
          onChange={onChange}
          className="filter__checkbox"
        />
        {props.filter.display}
      </span>
      <span className="filter__match-count">{matchCount}</span>
    </li>
  );
};

export default Filter;
