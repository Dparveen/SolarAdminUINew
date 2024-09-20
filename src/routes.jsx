// import { Fragment, lazy, Suspense } from 'react';
// import { Navigate, Route, Routes } from 'react-router-dom';

// // project import
// import Loader from './components/Loader/Loader';
// import AdminLayout from './layouts/AdminLayout';

// import { BASE_URL } from './config/constant';
// import BasicBreadcrumbPagination from lazy(() => import('./views/ui-elements/BasicBreadcrumbPagination'));
// // ==============================|| ROUTES ||============================== //

// const renderRoutes = (routes = []) => (
//   <Suspense fallback={<Loader />}>
//     <Routes>
//       {routes.map((route, i) => {
//         const Guard = route.guard || Fragment;
//         const Layout = route.layout || Fragment;
//         const Element = route.element;

//         return (
//           <Route
//             key={i}
//             path={route.path}
//             exact={route.exact}
//             element={
//               <Guard>
//                 <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
//               </Guard>
//             }
//           />
//         );
//       })}
//     </Routes>
//   </Suspense>
// );

// export const routes = [
//   {
//     exact: 'true',
//     path: '/auth/signup',
//     element: lazy(() => import('./views/auth/signup/SignUp1'))
//   },
//   {
//     exact: 'true',
//     path: '/auth/signin',
//     element: lazy(() => import('./views/auth/signin/SignIn1'))
//   },
//   {
//     exact: 'true',
//     path: '/auth/reset-password',
//     element: lazy(() => import('./views/auth/reset-password/ResetPassword1'))
//   },
//   {
//     path: '*',
//     layout: AdminLayout,
//     routes: [
//       {
//         exact: 'true',
//         path: '/dashboard',
//         element: lazy(() => import('./views/dashboard'))
//       },
//       {
//         exact: 'true',
//         path: '/department',
//         element: lazy(() => import('./views/ui-elements/BasicButton'))
//       },
//       {
//         exact: 'true',
//         path: '/staff',
//         element: lazy(() => import('./views/ui-elements/BasicBadges'))
//       },
//       {
//         exact: 'true',
//         path: '/inquery',
//         element: <BasicBreadcrumbPagination />
//       },
//       {
//         exact: 'true',
//         path: '/schemes',
//         element: <BasicBreadcrumbPagination />
//       },
//       {
//         exact: 'true',
//         path: '/questions',
//         element: <BasicBreadcrumbPagination />
//       },
//       {
//         exact: 'true',
//         path: '/location',
//         element: lazy(() => import('./views/ui-elements/BasicCollapse'))
//       },

//       {
//         exact: 'true',
//         path: '/materials',
//         element: lazy(() => import('./views/ui-elements/BasicTypography'))
//       },
//       {
//         exact: 'true',
//         path: '/profile',
//         element: lazy(() => import('./views/ui-elements/BasicTooltipsPopovers'))
//       },
//       {
//         exact: 'true',
//         path: '/sample-page',
//         element: lazy(() => import('./views/extra/SamplePage'))
//       },
//       {
//         path: '*',
//         exact: 'true',
//         element: () => <Navigate to={BASE_URL} />
//       }
//     ]
//   }
// ];

// export default renderRoutes;


import { Fragment, lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Project import
import Discom from 'views/Discom';
import Loader from './components/Loader/Loader';
import { BASE_URL } from './config/constant';
import AdminLayout from './layouts/AdminLayout';

// Lazily load all components
// const SignUp1 = lazy(() => import('./views/auth/signup/SignUp1'));
const SignIn1 = lazy(() => import('./views/auth/signin/SignIn1'));
const ResetPassword1 = lazy(() => import('./views/auth/reset-password/ResetPassword1'));
const Dashboard = lazy(() => import('./views/dashboard'));
const Department = lazy(() => import('./views/Department'));
const Staff = lazy(() => import('./views/Staff'));
const Inquery = lazy(() => import('./views/Inquery'));
const Location = lazy(() => import('./views/Location'));
const Scheme = lazy(() => import('./views/Scheme'));
const Questions = lazy(() => import('./views/Questions'));
const Materials = lazy(() => import('./views/Materials'));
const Profile = lazy(() => import('./views/Profile'));
const SamplePage = lazy(() => import('./views/extra/SamplePage'));

// Route rendering function
const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

// Routes configuration
export const routes = [
  // {
  //   exact: true,
  //   path: '/auth/signup',
  //   element: SignUp1
  // },
  {
    exact: true,
    path: '/auth/signin',
    element: SignIn1
  },
  {
    exact: true,
    path: '/auth/reset-password',
    element: ResetPassword1
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: true,
        path: '/dashboard',
        element: Dashboard
      },
      {
        exact: true,
        path: '/department',
        element: Department
      },
      {
        exact: true,
        path: '/staff',
        element: Staff
      },
      {
        exact: true,
        path: '/inquery',
        element: Inquery
      },
      {
        exact: true,
        path: '/schemes',
        element: Scheme
      },
      {
        exact: true,
        path: '/questions',
        element: Questions
      },
      {
        exact: true,
        path: '/location',
        element: Location
      },
      {
        exact: true,
        path: '/discom',
        element: Discom
      },
      {
        exact: true,
        path: '/materials',
        element: Materials
      },
      {
        exact: true,
        path: '/profile',
        element: Profile
      },
      {
        exact: true,
        path: '/sample-page',
        element: SamplePage
      },
      {
        path: '*',
        exact: true,
        element: () => <Navigate to={BASE_URL} />
      },
    ],
  },
];

export default renderRoutes;
