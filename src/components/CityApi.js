
const url = 'https://countriesnow.space/api/v0.1/countries';


class GetRes{
    constructor(url){
        this.url = url
    };
    async getJson(){
        const item = await fetch(this.url);
        const res = await item.json();
        return res.data.item;
    }
}

const res = new GetRes(url);
console.log(res.getJson());
