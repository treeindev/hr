import React from 'react';
import { ModalContent } from '../utils/models/modal';

interface ModalProps {
    content: ModalContent | undefined;
    set: Function;
}

function Modal(props: ModalProps) {
    const cautionProceed = () => {
        props.set(undefined);
        props.content?.callback();
    }

    const modal = <>
        <div id="modal-example" className="cmp__modal active">
            <div className="frame">
                <div className="container">
                    <i onClick={()=>{props.set(undefined)}} id="close-modal-example" className="close icon ion-md-close"></i>
                    <header>
                        <h4>{props.content?.title}</h4>
                    </header>
                    <div>
                        <p>{props.content?.body}</p>
                    </div>
                    { props.content?.showCaution ? <>
                        <footer>
                            <button className="danger" onClick={cautionProceed}>{props.content?.button}</button>
                            <button onClick={()=>{props.set(undefined)}} className="secondary inverted">Cancel</button>
                        </footer>
                    </> : '' }
                </div>
            </div>
        </div>
    </>

    return(<>{ props.content ? modal : '' }</>);
}

export default Modal;