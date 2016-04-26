import { hashHistory, browserHistory, Router, Route, Link } from 'react-router'
import Page1 from 'ui/Page1'
import Tab1 from 'ui/Tab1'
import Tab2 from 'ui/Tab2'

export default (
  <Route path="page1" component={Page1}>
    <Route path="tab1" component={Tab1} />
    <Route path="tab2" component={Tab2} />
  </Route>
)
