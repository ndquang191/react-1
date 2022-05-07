import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import React from "react";

function Recipe() {
	let params = useParams();
	const [detail, setDetail] = useState({});
	const [activeTab, setActiveTab] = useState("instruction");

	const fetchDetail = async (id) => {
		const data = await fetch(
			`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
		);

		const detailData = await data.json();
		setDetail(detailData);
	};

	useEffect(() => {
		fetchDetail(params.id);
	}, [params.id]);

	return (
		<DetailWrapper
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div>
				<h2>{detail.title}</h2>
				<img src={detail.image} alt="" />
			</div>
			<Info>
				<Button
					className={activeTab === "instruction" ? "active" : ""}
					onClick={() => setActiveTab("instruction")}
				>
					Instruction
				</Button>
				<Button
					className={activeTab === "ingredient" ? "active" : ""}
					onClick={() => setActiveTab("ingredient")}
				>
					Ingredients
				</Button>
				{activeTab === "instruction" && (
					<div>
						<h3
							dangerouslySetInnerHTML={{
								__html: detail.summary,
							}}
						></h3>
						<h3
							dangerouslySetInnerHTML={{
								__html: detail.instructions,
							}}
						></h3>
					</div>
				)}

				{activeTab === "ingredient" && (
					<ul>
						{detail.extendedIngredients.map((i) => (
							<li key={i.id}>{i.original}</li>
						))}
					</ul>
				)}
			</Info>
		</DetailWrapper>
	);
}

const DetailWrapper = styled.div`
	margin-top: 10rem;
	margin-bottom: 5rem;
	display: flex;
	.active {
		background: linear-gradient(35deg, #494949, #313131);
		color: white;
	}
	h2 {
		margin-bottom: 2rem;
	}
	li {
		font-size: 1.2rem;
		line-height: 2.5rem;
	}
	ul {
		margin-top: 2rem;
	}
`;

const Button = styled.button`
	padding: 1rem 2rem;
	color: #313131;
	background-color: white;
	border: 2px solid black;
	margin-right: 2rem;
	font-weight: 600;
`;

const Info = styled.div`
	margin-left: 10rem;
`;
export default Recipe;
