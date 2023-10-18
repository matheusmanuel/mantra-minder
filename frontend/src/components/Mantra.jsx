import React from 'react';

const Mantra = (props) => {
    return (  
        <div className='mantra'>
            <p className="mantra-title">{props.title}</p>
            <p className="mantra-text">{props.text}</p>
            <div className="mantra-footer d-flex align-items-center ">
                <div className='config'>
                    <img src="/assets/img/settings.svg" alt="setting" />
                </div>
                <label>
                    <input type="checkbox" className='d-none' defaultChecked={props.active==0?'':'checked'}/>
                    <div className="check d-flex align-items-center"></div>
                </label>
                <div className='time d-flex'>
                    <img src="/assets/img/timer.svg" alt="time" />
                    <p>{props.time}</p>
                </div>
            </div>
        </div>
    );
}
 
export default Mantra;