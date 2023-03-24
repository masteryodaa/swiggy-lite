const OfflineMessage = (online) => {
    if(online){
        return(<div className="onlinemsg"><i className="bi bi-check2-circle"></i>  You're online.</div>)
    }
    else{
        return(<div className="offlinemsg"><i className="bi bi-x-circle"></i>  You're offline.</div>)
    } 
}

export default OfflineMessage;