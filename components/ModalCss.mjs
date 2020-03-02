const ModalCss = `
.ModalText {
background-color: rgba(0, 0, 0, 0);
width: 408px;
height: 75px;
font-family: 'Helvetica Neue';
font-weight: 400;
font-size: 16px;
letter-spacing: 0;
text-align: LEFT;
line-height: 18.75px;
}

.ModalImage {
background-color: rgba(0, 0, 0, 0);
width: 408px;
height: 250px;
}

.Button {
background-color: rgba(33, 150, 83, 1);
width: 408px;
height: 64px;
border-radius: 8px;
font-family: 'Helvetica Neue';
font-weight: 500;
font-size: 16px;
letter-spacing: 0;
text-align: CENTER;
line-height: 18.75px;
}
{{div}}@media query and (min-width: 1024px) {width: 50%}@media query and (max-width: 1024px) {width: 100%}`

export default ModalCss;