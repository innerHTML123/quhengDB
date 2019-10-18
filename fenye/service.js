const book=require('./db.js');
exports.showIndex=(req,res)=>{
  res.render('login.html')
};
exports.showBiao=(req,res)=>{
	res.cookie('userName',req.body.nickname);
	res.cookie('passWord',req.body.nickpassword);
	res.cookie('num',1);
  let sql=`select * from info limit 0,2`;
  book.base(sql,null,(rows)=>{
    res.render('index',{list:rows})
  });
};
exports.showTian=(req,res)=>{
  res.render('tianjia.html')
};
exports.showJia=(req,res)=>{
  let info=req.body;
  console.log(info);
  let book1={};
  for(let k in info){
    book1[k]=info[k];
  }
  console.log(book1);
  let sql=`insert into info set ?`;
  book.base(sql,book1,(rows)=>{
    if(rows.affectedRows==1){
      res.redirect('/biaoge');
    }
  })
};
exports.showList=(req,res)=>{
  let pagesize=2;//定义当前页的条数
  console.log(req.query);
  let pagenum=1;//定义显示页码
  let totalNum;//总条数
  let totalPage;//总页码
  let Num=req.query.num;
  if (req.query.cz){
  	if (req.query.cz=='next') {
  		pagenum=parseInt(req.cookies.num)+1;
  		if(pagenum>totalPage){
  			res.cookie('num',totalPage);//此处应该有边界值判断
  			pagenum=(pagenum-2)*pagesize;
  		}else{
  			res.cookie('num',pagenum);
  			pagenum=(pagenum-1)*pagesize;
  		}
  		List(pagesize,pagenum,(rows)=>{
  			res.render('index',{list:rows})
  		})
  	}else if(req.query.cz=="prev"){
  		pagenum=parseInt(req.cookies.num)-1;
  		if (pagenum<0) {
  			res.cookie('num',1);
  			pagenum=(pagenum)*pagesize;
  		}else{
  			res.cookie('num',pagenum)
  			pagenum=(pagenum-1)*pagesize;
  		}
  		List(pagesize,pagenum,(rows)=>{
  			res.render('index',{list:rows})
  		})
  	}
  }else{
  	let sql=`select count(*) as count from info`;  	
  	book.base(sql,null,(rows)=>{
  	  totalNum=rows[0].count;
  	  totalPage=totalNum%pagesize==0?totalNum/pagesize:parseInt(totalNum/pagesize+1);
  	  if(Num>totalPage || Num<0){
  	    res.send('没有')
  	  }else if(Num>0 || Num<totalPage){
  	  	res.cookie('num',Num);
  	    pagenum=(parseInt(Num)-1)*pagesize;
  	    List(pagesize,pagenum,(rows)=>{
  	      res.render('index',{list:rows})
  	    })
  	  }
  	})
  }
};
function List(pagesize,pagenum,callback) {
  let sql='select * from info limit '+pagenum+','+pagesize;
  book.base(sql,null,(rows)=>{
    callback(rows);
  })
}
