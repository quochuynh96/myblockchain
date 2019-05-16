var express= require("express");
var app=express();
//var bodyParser = require('body-parser');
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");
app.listen(process.env.PORT || 5000)

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const SHA256= require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash=''){
        this.index=index;
        this.timestamp= timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash='';
        this.nonce=0;
    }
    calculateHash(){
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)+this.nonce).toString();
    }

    mineBLock(difficulty){
        while(this.hash.substring(0,difficulty)!==Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash=this.calculateHash();
        }
        //console.log("Block mined: "+this.hash);
    }
}
class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
        this.difficulty=2;
    }

    createGenesisBlock(){
        return new  Block(0,"30/03/2019","Genesis block","0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.previousHash=this.getLatestBlock().hash;
        newBlock.mineBLock(this.difficulty);
        this.chain.push(newBlock);
    }
    isChainValide(){
        for(let i=1;i<this.chain.length;i++){
            const currentBlock=this.chain[i];
            const previousBlock=this.chain[i-1];
            if(currentBlock.hash!== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}
let myBlockChain=new Blockchain();
myBlockChain.addBlock(new Block(1,"11/07/2011", { 
    HoTen:"Nguyễn Văn An", 
    NgaySinh:"03/02/1995",
    NoiSinh: "Thủy Dương, Hương Thủy, Thừa Thiên Huế",
    GioiTinh:"Nam",
    DanToc:"Kinh",
    Truong:{MaTruong:"thpt-qhoc",TenTruong:"THPT Hương Thủy"},
    KhoaThi: "22/06/2013",
    HoiDongThi:"Sở GDDT Thừa Thiên Huế",
    XepLoai:"Khá",
    HinhThucDT:"CHÍNH QUY",
    SoHieu:"B 1958945",
    SoVaoSo:"2015.02378",
    NgayCap:"14/05/2014"}));
myBlockChain.addBlock(new Block(2,"29/03/2019", {
    HoTen:"Lê Văn Bình", 
    NgaySinh:"08/02/1996",
    NoiSinh: "Phường Đúc, Thành phố Huế, Thừa Thiên Huế",
    GioiTinh:"Nam",
    DanToc:"Kinh",
    Truong:{MaTruong:"thpt-nhue",TenTruong:"THPT Gia Hội"},
    KhoaThi: "22/06/2014",
    HoiDongThi:"Sở GDDT Thừa Thiên Huế",
    XepLoai:"Khá",
    HinhThucDT:"CHÍNH QUY",
    SoHieu:"B 1997945",
    SoVaoSo:"2016.02378",
    NgayCap:"14/05/2016",
}));
myBlockChain.addBlock(new Block(3,"29/03/2019", {
    HoTen:"Trần Thị Kim Chi", 
    NgaySinh:"18/12/1997",
    NoiSinh: " phường Vĩnh Ninh, Thành phố Huế, Thừa Thiên Huế",
    GioiTinh:"Nữ",
    DanToc:"Kinh",
    Truong:{MaTruong:"thpt-hbtrung",TenTruong:"THPT Gia Hội"},
    KhoaThi: "22/06/2014",
    HoiDongThi:"Sở GDDT Thừa Thiên Huế",
    XepLoai:"Giỏi",
    HinhThucDT:"CHÍNH QUY",
    SoHieu:"B 1997945",
    SoVaoSo:"2016.02378",
    NgayCap:"14/05/2017",
}));
myBlockChain.addBlock(new Block(4,"29/03/2019", {
    HoTen:"Cao Văn Cường", 
    NgaySinh:"18/12/2000",
    NoiSinh: "phường An Hòa, Thành phố Huế, Thừa Thiên Huế",
    GioiTinh:"Nam",
    DanToc:"Kinh",
    Truong:{MaTruong:"thpt-clang",TenTruong:"THPT Chi Lăng"},
    KhoaThi: "22/06/2018",
    HoiDongThi:"Sở GDDT Thừa Thiên Huế",
    XepLoai:"Giỏi",
    HinhThucDT:"CHÍNH QUY",
    SoHieu:"B 2000456",
    SoVaoSo:"2016.02379",
    NgayCap:"14/05/2018",
}));
myBlockChain.addBlock(new Block(5,"29/03/2019", {
    HoTen:"Nguyễn Thị Thu Hà", 
    NgaySinh:"05/06/1998",
    NoiSinh: "phường An Cựu, Thành phố Huế, Thừa Thiên Huế",
    GioiTinh:"Nữ",
    DanToc:"Kinh",
    Truong:{MaTruong:"thpt-nhue",TenTruong:"THPT Nguyễn Huệ"},
    KhoaThi: "22/06/2015",
    HoiDongThi:"Sở GDDT Thừa Thiên Huế",
    XepLoai:"Giỏi",
    HinhThucDT:"CHÍNH QUY",
    SoHieu:"B 1998246",
    SoVaoSo:"2017.02379",
    NgayCap:"14/05/2018",
}));


app.get("/",function(req,res){
});

app.get("/home",function (req,res) {
});
app.post("/home",urlencodedParser,function(req,res){
});
app.get("/get",function(req,res){
    res.json(JSON.stringify(myBlockChain.chain));
});
