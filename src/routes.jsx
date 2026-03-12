import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import AddEvent from './components/AddEvent';
import UpdateEvent from './components/UpdateEvent';
import ReservationForm from './componentsRevision/ReservationForm';
import PropertyForm from './componentsRevision/PropertyForm';
import PropertyUpdate from './componentsRevision/PropertyUpdate';
import QuizForm from './Quiz/QuizForm';
import QuizUpdate from './Quiz/QuizUpdate';


const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const EventList = React.lazy(() => import("./components/EventList"));
const EventDetails = React.lazy(() => import("./components/EventDetails"));
const Properties = React.lazy(() => import("./componentsRevision/Properties"));
const Quizzes = React.lazy(() => import("./Quiz/Quizzes"));
const NotFound = React.lazy(() => import("./components/NotFound"));

const homeLoader = () => {
    return "message from loader";
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <React.Suspense fallback={<div>Loading...</div>}><NotFound /></React.Suspense>,
        children: [
            {
                index: true,
                element: <Home />,
                loader: homeLoader
            },
            {
                path: "events",
                children: [
                    {
                        index: true,
                        element: <EventList />
                    },
                    {
                        path: "add",
                        element: <AddEvent />
                    },
                    {
                        path: "update/:id",
                        element: <UpdateEvent />
                    },
                    {
                        path: ":name",
                        element: <EventDetails />
                    }
                ]
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "properties",
                element: <Properties />
            },
            {
                path: "properties/add",
                element: <PropertyForm />
            },
            {
                path: "reserve/:id",
                element: <ReservationForm />
            },
            {
                path: "properties/update/:id",
                element: <PropertyUpdate />
            },
            {
                path: "quizzes",
                element: <Quizzes />
            },
            {
                path: "quizzes/add",
                element: <QuizForm />
            },
            {
                path: "quizzes/update/:id",
                element: <QuizUpdate />
            },

            {
                path: "*",
                element: <NotFound />
            }
        ]
    }
]);