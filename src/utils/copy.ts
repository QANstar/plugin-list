import { message } from "antd";

const copy = (value:string)=>{
    let transfer = document.createElement('input');
    document.body.appendChild(transfer);
    transfer.value = value;  // 这里表示想要复制的内容
    transfer.focus();
    transfer.select();
    if (document.execCommand('copy')) { //判断是否支持document.execCommand('copy')       document.execCommand('copy');
    }
    transfer.blur();
    console.log('复制成功');
    message.success("复制成功")
    document.body.removeChild(transfer);
}
export default copy