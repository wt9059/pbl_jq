$(window).load(function(){

   var records = [
      {'src': './pic/webp (1).webp','title': '这是一段描述'},
      {'src': './pic/webp (2).webp','title': '这是一段描述'},
      {'src': './pic/webp (3).webp','title': '这是一段描述'},
      {'src': './pic/webp (4).webp','title': '这是一段描述'},
      {'src': './pic/webp (5).webp','title': '这是一段描述'},
      {'src': './pic/webp (6).webp','title': '这是一段描述'},
      {'src': './pic/webp (7).webp','title': '这是一段描述'},
      {'src': './pic/webp (8).webp','title': '这是一段描述'},
      {'src': './pic/webp (9).webp','title': '这是一段描述'},
      {'src': './pic/webp (10).webp','title': '这是一段描述'},]

   
   PBL('wrap','box');

   $(document).scroll(function(){
      // 校验数据请求
      if(getCheck('wrap', 'box')){
         var $wrap = $('#wrap');

//     2.2 添加新的.box元素。（jQ）
         jQuery.each(records, function(i, record){
            var str = `<div class="box">\
                        <div class="info">\
                           <div class="pic"><img src="${record.src}"/></div>\
                           <div class="title"><a href="#">${record.title}</a></div>\
                        </div>\
                     </div>`;
            $wrap.append(str);
         });
//     2.3 将新增的.box元素放到对应的位置上。（jQ：PBL()）
         PBL('wrap', 'box');
      }
   });
});
function getCheck(wrap, box){
   var documentHeight = $(window).height();
   var scrollHeight = $(window).scrollTop();
   
   return documentHeight + scrollHeight >= getLastH(wrap, box) ? true : false;
}

function getLastH(wrap, box){
   var $wrap = $('#' + wrap);
   var $boxes = $wrap.find('.' + box);
   
   return $boxes.last().position().top + $boxes.last().outerHeight(false);
   
}

function PBL(wrap, box){
   //获取#wrap和.box
   var $wrap = $('#' + wrap);
   var $boxes = $wrap.find('.' + box);

   // 获取屏幕可现实的列数，多于三列仅显示三列
   var boxWidth = $boxes.eq(0).outerWidth(false);
   var screenWidth = $(window).width();

   var columns = Math.floor(screenWidth / boxWidth);
   if(columns > 3){
      columns = 3;
   }
   $wrap.width(boxWidth * columns);

   // 得到所有box，按瀑布流来排列
   var everyH = [];//记录每列高度的数组
   for(var i = 0; i < $boxes.length; i++){
      if(i < columns){
         //数组内还没有图片，只记录高度
         everyH[i] = $boxes.eq(i).outerHeight(false);
      }else {
         //在最短的列上添加图片
         var minH = Math.min.apply(null,everyH);//找出最短的高度
         var minIndex = getIndex(minH,everyH);//最短的一列
         placeBox($boxes.eq(i),minH, Math.floor($boxes.eq(minIndex).position().left),i);
         everyH[index] += $boxes.eq(i).outerHeight(false);
      }
   }
   console.log(everyH);
}

//找出最短的一列
function getIndex(minH,everyH){
   for(index in everyH){
      if(minH == everyH[index]){
         return index;
      }
   }
}

var getStartNum = 0; //记载数据的初始位置
function placeBox($box,top,left,index){
   if(getStartNum >= index){
      return;
   }

   $box.css({
      'position': 'absolute',
      'top': top,
      'left': left,
      'opacity': '0',   
   });

   $box.stop().animate({
      'opacity': '1',
   },999);

   getStartNum = index; //更新请求数据的条数位置
}