import React from 'react';
import AlertBoxDiv from '../styles/Alert';

const AlertBox = ({ classType, title, subtitle, cancelTxt, deleteTxt, handleCancel, handleConfirm, icon }) => {
	return (
		<AlertBoxDiv className={classType}>
			<div className="icon-alert">
				<img src={icon} alt={"alert"}/>
			</div>
			<div className="info-alert">
				<div className="title-alert">{title}</div>
				<div className="subtitle-alert">{subtitle}</div>
				<div className="action-alert">
					<button onClick={handleCancel}>{cancelTxt}</button>
					<button className="active" onClick={handleConfirm}>
						{deleteTxt}
					</button>
				</div>
			</div>
		</AlertBoxDiv>
	);
};
export default AlertBox;
