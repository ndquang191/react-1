import React from "react";
import Home from "./Home";
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import Recipe from "./Recipe";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function Page() {
	const location = useLocation()

	return (
		<AnimatePresence exitBeforeEnter>
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<Home />}></Route>
				<Route path="/cuisine/:type" element={<Cuisine />} />
				<Route path="/search/:search" element={<Searched />} />
				<Route path="/recipe/:id" element={<Recipe />} />
			</Routes>
		</AnimatePresence>
	);
}

export default Page;
