import React from 'react';
import "./TopNav.scss";

export default function TopNav(props) {


	return (
		<div className="topNav">
			<div className="title">AnimScript</div>
			<div className="buttons">
				<button onClick={props.onRun}>run</button>
				<button onClick={props.onStop}>stop</button>
				<button className="memdump" onClick={props.onMemdump}>*memdump</button>
			</div>
		</div>
	)
}
