import styled from 'styled-components';

const AlertBoxDiv = styled.div`
	&.hide-box {
		display: none !important;
	}
	&.alert-box {
		position: fixed;
		top: 0px;
		left: 25%;

		display: flex;
		height: 80px;
		width: 236px;
		padding: 10px 0px 0px 16px;
		z-index: 1001;
		background: #efefef;
		border: none;
		box-shadow: 1px 3px 3px 0 rgb(0 0 0 / 20%), 1px 3px 15px 2px rgb(0 0 0 / 20%);
		border-radius: .28571429rem;
		.info-alert {
			width: 100%;
			margin-right: 14px;
			margin-left: 10px;
		}
		.title-alert {
			font-size: 0.65em;
			font-weight: bold;
			line-height: 12px;
		}
		.action-alert {
			position: absolute;
			bottom: 10px;
			right: 12px;

			button {
				background: white;
				border: 1px solid #cccccc;
				border-radius: 4px;
				height: 14px;
				font-size: 0.58em;
				min-width: 50px;
				padding: 0 10px;
				&:first-child {
					margin-right: 8px;
				}
			}
		}
		.active {
			background: linear-gradient(0deg, #097dff, #6cb3fa 100%) no-repeat !important;
			color: white;
		}
		.subtitle-alert {
			font-size: 0.55em;
			line-height: 10px;
			margin-top: 6px;
		}
		.icon-alert {
			img {
				width: 38px;
			}
		}
	}
`;

export default AlertBoxDiv;
