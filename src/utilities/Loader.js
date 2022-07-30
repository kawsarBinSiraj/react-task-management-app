import React from "react"
import ReactLoading from "react-loading"

const Loader = ({ type, color }) => {
	return (
		<>
			<div className="loader d-flex  align-items-center justify-content-center">
				<ReactLoading type={type} color={color} height={"10%"} width={"10%"} />
			</div>
		</>
	)
}

export default Loader
