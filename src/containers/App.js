import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import CardList from '../components/CardList.js'
import SearchBox from '../components/SearchBox.js'
import Scroll from '../components/Scroll.js'
import ErrorBoundary from '../components/ErrorBoundary.js'
import { setSearchField } from '../actions.js'

const mapStateToProps = state => {
    
}

const App = () => {
  const [robots, setRobots] = useState([])
  const [searchField, setSearchField] = useState('')
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        setRobots(users)
      })
  }, [])
  const onSearchChange = event => {
    setSearchField(event.target.value)
  }

  const filterRobots = robots.filter(item => {
    return item.name.toLowerCase().includes(searchField.toLowerCase())
  })

  return !robots.length ? (
    <h1> LOADING...</h1>
  ) : (
    <div className='tc'>
      <h1 className='f1'>RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundary>
          <CardList robots={filterRobots} />
        </ErrorBoundary>
      </Scroll>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
