$(function () {
    let box=$('.box')
    let flag=true;
    let black={},white={};
    let blank={};
    let ai=true;

    for (let i=0;i<15;i++){
        for (let j=0;j<15;j++){
            $('<div>').addClass("chess").attr('id',i+"_"+j).appendTo(box)
            blank[i+'_'+j]=true;
        }
    }
    box.on('click','.chess',function () {
        let _this=$(this);
        if (_this.hasClass('black')||_this.hasClass('white')) {
            return;
        }
        flag=!flag;
        let coords=_this.attr('id');
        if (flag){
            /*     _this.addClass('black')
                 black[coords]=true;
                 delete blank[coords];
                 if(isSuccess(black,coords)>=5){
                     alert("黑棋获胜")
                     box.off('click');
                 }*/


        }else {
            white[coords]=true;
            delete blank[coords];
            $(this).addClass('white')
            if(isSuccess(white,coords)>=5){
                alert("白棋获胜")
                box.off('click');
            }
            //智能
            if (ai){
                let pos=aifn();
                blank[pos]=true;
                delete blank[pos];
                $('#'+pos).addClass('black');
                if(isSuccess(black,pos)>=5){
                    alert("黑棋获胜")
                    box.off('click');
                }
                flag=!flag;
            }
        }
    })
    function aifn() {
        let blankstore=0,whitestore=0;
        let pos1='',pos2='';
        for (let i in blank){
            let score=isSuccess(black,i)
            if (score>=blankstore){
                blankstore=score;
                pos1=i;
            }
        }
        for (let i in blank){
            let score=isSuccess(white,i)
            if (score>=whitestore){
                whitestore=score;
                pos2=i
            }
        }
        return blankstore>=whitestore ?pos1:pos2;
    }

    function isSuccess(obj,coords) {
        let sp=1,cz=1 ,zx=1,yx=1;
        let[x,y]=coords.split('_');
        let i=x*1,j=y*1;
        while (obj[i+'_'+(++j)]){
            sp++;
        }
        j=y*1;
        while (obj[i+'_'+(--j)]){
            sp++;
        }
        j=y*1;
        // sp
        while (obj[(++i)+'_'+j]){
            cz++;
        }
        i=x*1;
        while (obj[(--i)+'_'+j]){
            cz++;
        }
        i=x*1;
        while (obj[(++i)+'_'+(++j)]){
            yx++;
        }
        i=x*1;
        j=y*1;
        while (obj[(--i)+'_'+(--j)]){
            yx++;
        }
        i=x*1;
        j=y*1;
        while (obj[(++i)+'_'+(--j)]){
            zx++;
        }
        i=x*1;
        j=y*1;
        while (obj[(--i)+'_'+(++j)]){
            zx++;
        }
        i=x*1;
        j=y*1;
        return Math.max(sp,cz,zx,yx);

    }


})