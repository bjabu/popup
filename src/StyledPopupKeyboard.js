import styled from 'styled-components';


export const Popup = styled.div`
	display: inline-block;
	position: absolute;
	right: 20px;
	bottom: 20px;
	box-shadow: lightgrey 3px 3px 8px 4px
`;

export const Close = styled.button`
	padding: 16px;
	position: absolute;
	top:0;
	left: 0;
	cursor: pointer;
`;

export const PopupInner = styled.div`
	width: 320px;
	padding-top: 50px;
`;
