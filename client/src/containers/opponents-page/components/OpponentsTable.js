import React, { useEffect } from 'react'
import $ from 'jquery'
import BootstrapTable from 'react-bootstrap-table-next';
import { NavLink } from 'react-router-dom'

const OpponentsTable = (props) => {

  useEffect(() => {
    $('[data-toggle="tooltip"]').tooltip();
  })

  const nameFormatter = (cell, row) => {
    return (
      <NavLink className="text-green" to={`/opponents/${row.id}`}>
        {cell}
      </NavLink>
    )
  }

  const tournamentFormatter = (cell, row) => {
    return (
      <NavLink className="text-black" to={`/tournaments/${row.match.tournament.id}`}>
        {cell}
      </NavLink>
    )
  }

  const customSortCaret = (order, column) => {
    if (!order) {
      return (<span className="ml-3 text-green"><i className="fas fa-chevron-up"></i></span>);
    } else if (order === 'asc') {
      return (<span className="ml-3 text-green"><i className="fas fa-chevron-up"></i></span>);
    } else if (order === 'desc') {
      return (<span className="ml-3 text-green"><i className="fas fa-chevron-down"></i></span>);
    } else {
      return null;
    }
  }

  const createOpponentsData = () => {
    const result = []

    for(let opponent of props.opponents) {
      opponent.name = opponent.first_name + " " + opponent.last_name
      opponent.plays = opponent.handedness + " Handed"
      result.push(opponent)
    }

    return result
  }

  const columns = [{
    dataField: 'name',
    text: 'Name',
    sort: true,
    sortCaret: customSortCaret,
    classes: 'text-green',
    formatter: nameFormatter
  }, {
    dataField: 'age',
    text: 'Age',
    sort: true,
    sortCaret: customSortCaret
  }, {
    dataField: 'plays',
    text: "Plays",
    sort: true,
    sortCaret: customSortCaret
  }, {
    dataField: 'utr',
    text: "UTR",
    sort: true,
    sortCaret: customSortCaret
  }, {
    dataField: 'match.tournament.title',
    text: "Played In",
    sort: true,
    sortCaret: customSortCaret,
    formatter: tournamentFormatter
  }];

  return (
    <div className="col-12 text-center mx-auto">
      <BootstrapTable keyField="id" data={createOpponentsData()} columns={columns} bootstrap4={true} bordered={false} classes="table-borderless" headerClasses="text-green border-0" rowClasses="border-bottom" />
    </div>
  )
}

export default OpponentsTable
