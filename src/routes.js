import React, { useEffect, useState } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import GoogleFontLoader from 'react-google-font-loader'
import Loader from './utils/loader'
import MainLayout from './hoc/mainLayout'
import AuthGuard from './hoc/authGuard'

import { useDispatch, useSelector } from 'react-redux'
import { isAuthUser } from './store/actions/users_actions'

import Home from './components/home'
import Header from './components/navigation/header'
import Auth from './components/auth'
import Dashboard from './components/dashboard'
import Profile from './components/dashboard/profile'
import Articles from './components/dashboard/articles'
import AddArticle from './components/dashboard/articles/add'
import EditArticle from './components/dashboard/articles/edit'
import Article from './components/articles/article'
import Contact from './components/contact'
import AccountVerify from './components/auth/verification'
import Categories from './components/dashboard/categories'
import SearchResults from './components/search'

import Axios from 'axios'
Axios.defaults.baseURL = process.env.BACKENDURL || 'https://flickbase-backend-api.onrender.com'

const Routes = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(isAuthUser())
  }, [dispatch])

  useEffect(() => {
    if (users.auth !== null) {
      setLoading(false)
    }
  }, [users])

  return (
    <BrowserRouter>
      <Header />

      {loading ? (
        <Loader />
      ) : (
        <MainLayout>
          <Switch>
            <Route path='/dashboard/articles/edit/:id' component={AuthGuard(EditArticle, true)} />
            <Route path='/dashboard/articles/add' component={AuthGuard(AddArticle, true)} />
            <Route path='/dashboard/articles' component={AuthGuard(Articles, true)} />
            <Route path='/dashboard/profile' component={AuthGuard(Profile)} />
            <Route path='/dashboard/categories' component={AuthGuard(Categories)} />
            <Route path='/dashboard' component={AuthGuard(Dashboard)} />
            <Route path='/article/:id' component={Article} />
            <Route path='/contact' component={Contact} />
            <Route path='/verification' component={AccountVerify} />
            <Route path='/searchresults' component={SearchResults} />
            <Route path='/auth' component={Auth} />
            <Route path='/' component={Home} />
          </Switch>
        </MainLayout>
      )}
      <GoogleFontLoader fonts={[{ font: 'Roboto', weights: [300, 400, 900] }, { font: 'Fredoka One' }]} />
    </BrowserRouter>
  )
}

export default Routes

