// import { StrictMode } from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import 'bootstrap/dist/css/bootstrap.min.css';


import { routeTree } from './routeTree.gen'
import {serviceInit} from "./authService/FirebaseAuthService.ts";

const router = createRouter({ routeTree })

// // Register the router instance for type safety
// declare module '@tanstack/react-router' {
//   interface Register {
//     router: typeof router
//   }
// }

serviceInit();

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    // <StrictMode>
      <RouterProvider router={router} />
    // </StrictMode>,
  )
}