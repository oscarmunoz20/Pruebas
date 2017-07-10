var tpdf=0;
var tocr=0;
var tomr=0;
var tbcr=0;

    function rgbToHex(r, g, b) {
       if (r > 255 || g > 255 || b > 255){
           throw "Invalid color component";
        }
       return ((r << 16) | (g << 8) | b).toString(16);
   }

    function my_isblack(data,pos){
      	if(data[pos]<50 && data[pos+1]<50 && data[pos+2]<50){
      		return 1;
      	}
      	else{
      		return 0;
      	}
    }

    function getSum(total, num) {
        return total + num;
    }

    function verticalAxes(start,end,x_pos,markSize,errorAdmited){
	   start=Math.round(start);
	   end=Math.round(end);
           markSize=Math.round(markSize);
           errorAdmited=Math.round(errorAdmited);
           var b = [0,0,0,0,0];
           var black = [];
	   var data1 = ctx.getImageData(x_pos, 0, 1, end).data;
	   var data2 = ctx.getImageData(x_pos+1, 0, 1, end).data;
	   var data3 = ctx.getImageData(x_pos+2, 0, 1, end).data;
	   var data4 = ctx.getImageData(x_pos+3, 0, 1, end).data;
	   var data5 = ctx.getImageData(x_pos+4, 0, 1, end).data;
           for (var k = start; k < end; k++){
               b[0]=my_isblack(data1,k*4);
               b[1]=my_isblack(data2,k*4);
               b[2]=my_isblack(data3,k*4);
               b[3]=my_isblack(data4,k*4);
               b[4]=my_isblack(data5,k*4);
               if(b.reduce(getSum)>3){
                   black[k]=1;
                   /*var imgData = ctx.createImageData(4, 1);
                   var j;
                   for (j = 0; j < imgData.data.length; j += 4) {
                       imgData.data[j+0] = 0;
                       imgData.data[j+1] = 0;
                       imgData.data[j+2] = 255;
                       imgData.data[j+3] = 255;
                   }
                   ctx.putImageData(imgData, x_pos, k);*/
               }
               else{
                   black[k]=0;
                   /*var imgData = ctx.createImageData(4, 1);
                   var j;
                   for (j = 0; j < imgData.data.length; j += 4) {
                       imgData.data[j+0] = 255;
                       imgData.data[j+1] = 0;
                       imgData.data[j+2] = 0;
                       imgData.data[j+3] = 255;
                   }
                   ctx.putImageData(imgData, x_pos, k);*/
               }
           }
           var peaks=[];
           var first=-1;
           var first_found='no';
           var second=-1;
           var second_found='no';
           var m = 0;
           var sub=0;

           for(var k=start+(markSize/2);k<end-(markSize/2);k++){
                sub=0;
                for (var z = k-(markSize/2); z < k+(markSize/2); z++){
                    sub = sub + black[z];
                }
                if (sub >= errorAdmited && first_found==='no' && second_found==='no'){
                    first=k;
                    first_found='yes';
                }
                if (sub < errorAdmited && first_found==='yes' && second_found==='no'){
                    second=k;
                    second_found='yes';
                }
                if (first_found==='yes'&& second_found==='yes'){
                    peaks[m]=(first+second)/2;
                    first_found='no';
                    second_found='no';
                    m++;
                }
            }
            return peaks;

    }

    function horizontalAxes(start,end,y_pos,markSize,errorAdmited){
	    start=Math.round(start);
	    end=Math.round(end);
            markSize=Math.round(markSize);
            errorAdmited=Math.round(errorAdmited);
            var b = [0,0,0,0,0];
            var black = [];
	    var data1 = ctx.getImageData(0,y_pos,end,1).data;
	    var data2 = ctx.getImageData(0,y_pos+1,end,1).data;
	    var data3 = ctx.getImageData(0,y_pos+2,end,1).data;
	    var data4 = ctx.getImageData(0,y_pos+3,end,1).data;
	    var data5 = ctx.getImageData(0,y_pos+4,end,1).data;
            for (var k = start; k < end; k++){
               b[0]=my_isblack(data1,k*4);
               b[1]=my_isblack(data2,k*4);
               b[2]=my_isblack(data3,k*4);
               b[3]=my_isblack(data4,k*4);
               b[4]=my_isblack(data5,k*4);
                if(b.reduce(getSum)>3){
                    black[k]=1;
                    /*var imgData = ctx.createImageData(1, 4);
                    var j;
                    for (j = 0; j < imgData.data.length; j += 4) {
                        imgData.data[j+0] = 0;
                        imgData.data[j+1] = 0;
                        imgData.data[j+2] = 255;
                        imgData.data[j+3] = 255;
                    }
                    ctx.putImageData(imgData,k,y_pos);*/
                }
                else{
                    black[k]=0;
                    /*var imgData = ctx.createImageData(1, 4);
                    var j;
                    for (j = 0; j < imgData.data.length; j += 4) {
                        imgData.data[j+0] = 255;
                        imgData.data[j+1] = 0;
                        imgData.data[j+2] = 0;
                        imgData.data[j+3] = 255;
                    }
                    ctx.putImageData(imgData, k, y_pos);*/
                }
            }
            var peaks=[];
            var first=-1;
            var first_found='no';
            var second=-1;
            var second_found='no';
            var m = 0;
            var sub=0;

            for(var k=start+(markSize/2);k<end-(markSize/2);k++){
                 sub=0;
                 for (var z = k-(markSize/2); z < k+(markSize/2); z++){
                     sub = sub + black[z];
                 }
                 if (sub >= errorAdmited && first_found==='no' && second_found==='no'){
                     first=k;
                     first_found='yes';
                 }
                 if (sub < errorAdmited && first_found==='yes' && second_found==='no'){
                     second=k;
                     second_found='yes';
                 }
                 if (first_found==='yes'&& second_found==='yes'){
                     peaks[m]=(first+second)/2;
                     first_found='no';
                     second_found='no';
                     m++;
                 }
             }
             return peaks;
    }

    function intersection(y11,y12,x11,x12,y21,y22,x21,x22){
        var m1 = (y11-y12)/(x11-x12);
        var m2 = (y21-y22)/(x21-x22);
        if ((x21-x22)==0){
            var xi=x21;
        }else{
            var xi=(m1*x11-m2*x21-y11+y21)/(m1-m2);
        }
        var yi=(m1*(xi-x11)+y11);
        //console.log(y12);
        //alert ("puntos x= " + xi + " y= " + yi);
        return i=[xi,yi];
    }

    function drawRotated(){
        ctx.save();
        ctx.translate(img.width/2,img.width/2);
        ctx.rotate(degrees);
        ctx.drawImage(img,-img.width/2,-img.width/2);
        ctx.restore();
    }

    function drawRotated2(image,degrees){
        ctx.save();
        ctx.translate(image.width/2,image.width/2);
        ctx.rotate(degrees);
        ctx.drawImage(image,-image.width/2,-image.width/2);
        ctx.restore();
    }

    function handleFileSelect(evt) {
      $('#loading').modal('show');
      $('#files_input').hide();
      $('#redForm_run').show();
      var files = evt.target.files; // FileList object
      // Loop through the FileList and render image files as thumbnails.
      var i = 0;
      (function loop() {
        f = files[i]
        if (f == null){
            $('#loading').modal('hide');
        }else{
            // Only process image files.
            if (!f.type.match('image.*')) {
                i++;
                setTimeout(loop, 0);
            }else{
                var reader = new FileReader();

                // Closure to capture the file information.
                reader.onload = (function(theFile) {
                  return function(e) {
                    // Render thumbnail.
                    var span = document.createElement('span');
                    span.innerHTML = ['<img height="100" class="thumb" src="', e.target.result, '" title="', escape(theFile.name), '"/><img class="thumb" name="forms" src="', e.target.result, '" title="', escape(theFile.name), '"/ hidden>'].join('');
                    document.getElementById('list').insertBefore(span, null);
                    var span = document.createElement('span');
                    span.innerHTML = ['<canvas id="borrar"></canvas>'].join('');
                    document.getElementById('list2').insertBefore(span, null);
                  };
                })(f);
                // Read in the image file as a data URL.
                reader.readAsDataURL(f);
                i++
                setTimeout(loop, 0);
            }
        }
      })();

    }

    function setImages(ca,ct,page, viewport, pdfs){
        var task = page.render({canvasContext: ct, viewport: viewport})
        task.promise.then(function(){
            srcs = ca.toDataURL('image/png');
            var span = document.createElement('span');
            span.innerHTML = ['<img height="100" class="thumb" src="', srcs, '"/><img class="thumb" name="forms" src="', srcs, '"/ hidden>'].join('');
            document.getElementById('list').insertBefore(span, null);
            var span = document.createElement('span');
            span.innerHTML = ['<canvas id="borrar"></canvas>'].join('');
            document.getElementById('list2').insertBefore(span, null);
            tpdf++;
            if (pdfs==tpdf){
              $('#loading').modal('hide');
            }
        });
    }

    function handleFileSelectPdf(ev) {
      $('#loading').modal('show');
      $('#files_input').hide();
      $('#redForm_run').show();
      if (file = document.getElementById('pdf').files[0]) {
        fileReader = new FileReader();
        fileReader.onload = function(ev) {
          console.log(ev);
          PDFJS.getDocument(fileReader.result).then(function getPdfHelloWorld(pdf) {
            console.log(pdf)
            for (i = 1; i <= pdf.numPages; i++){
                pdf.getPage(i).then(function getPageHelloWorld(page) {
                    var scale = 3;
                    var viewport = page.getViewport(scale);
                    var tcanvas = document.createElement('canvas');
                    var tctx = tcanvas.getContext("2d");
                    tctx.clearRect(0, 0, tcanvas.width, tcanvas.height);
                    tcanvas.width = viewport.width;
                    tcanvas.height = viewport.height;
                    setImages(tcanvas,tctx, page, viewport, pdf.numPages);
                });
            }
          }, function(error){
            console.log(error);
          });
        };
        fileReader.readAsArrayBuffer(file);
      }
    }

    function handleFiles(e) {

        var files = input.files;

        for (var i = 0; i < files.length; ++i) {

            var MAX_RATIO_A4 = 0.728;
            var MIN_RATIO_A4 = 0.704;
            var MAX_RATIO_LETTER = 0.776;
            var MIN_RATIO_LETTER = 0.768;

            img.onload = function(){
                sheet_corners()
            };
            img.src = URL.createObjectURL(e.target.files[i]);
        }
    }

    function pdftocanvas(ev) {
      if (file = document.getElementById('pdf').files[0]) {
        fileReader = new FileReader();
        fileReader.onload = function(ev) {
          console.log(ev);
          PDFJS.getDocument(fileReader.result).then(function getPdfHelloWorld(pdf) {
            console.log(pdf)
            pdf.getPage(1).then(function getPageHelloWorld(page) {
              var scale = 3;
              var viewport = page.getViewport(scale);
              ctx = canvas.getContext("2d");
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              canvas.width = viewport.width;
              canvas.height = viewport.height;
              var task = page.render({canvasContext: ctx, viewport: viewport})
              task.promise.then(function(){
                  srcs = canvas.toDataURL('image/png');
                  img.src = srcs;
                  setTimeout(function(){ sheet_corners(); },500);
              });
            });
          }, function(error){
            console.log(error);
          });
        };
        fileReader.readAsArrayBuffer(file);
      }
    }

    function sheet_corners(){
        var MAX_RATIO_A4 = 0.728;
        var MIN_RATIO_A4 = 0.704;
        var MAX_RATIO_LETTER = 0.776;
        var MIN_RATIO_LETTER = 0.768;
        var x_y = img.width/img.height;
        if(x_y>MAX_RATIO_A4 || x_y<MIN_RATIO_A4) {
            if(x_y>MAX_RATIO_LETTER || x_y<MIN_RATIO_LETTER) {
                alert("No se puede procesar el formulario, el tama単o de la hoja debe se A4 o Carta");
                return;
            }
        }
        $('#file_upload').hide();
        $('#commands').show();
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var x11=(260/1660)*img.width;
        var v1 = verticalAxes((20/2340)*img.height,(400/2340)*img.height,x11,(20/2340)*img.height,(10/2340)*img.height);
        var y21=(250/2340)*img.height;
        var h1 = horizontalAxes((20/1660)*img.width,(400/1660)*img.width,y21,(20/1660)*img.width,(10/1660)*img.width);
        var x12=(1380/1660)*img.width;
        var v2 = verticalAxes((20/2340)*img.height,(400/2340)*img.height,x12,(20/2340)*img.height,(10/2340)*img.height);
        var x13=(260/1660)*img.width;
        var v3 = verticalAxes((1940/2340)*img.height,(2320/2340)*img.height,x13,(20/2340)*img.height,(10/2340)*img.height);
        var y23=(2070/2340)*img.height;
        var h3 = horizontalAxes((20/1660)*img.width,(400/1660)*img.width,y23,(20/1660)*img.width,(10/1660)*img.width);
        var x14=(1380/1660)*img.width;
        var v4 = verticalAxes((1940/2340)*img.height,(2300/2340)*img.height,x14,(20/2340)*img.height,(10/2340)*img.height);
        var i1 = intersection(v1[0],v2[0],x11,x12,y21,y23,h1[0],h3[0]);
        var i3 = intersection(v3[(v3.length)-1],v4[(v4.length-1)],x13,x14,y23,y21,h3[0],h1[0]);

        degrees = -Math.atan(-1*(i3[0]-i1[0])/(i3[1]-i1[1]));
        //console.log(i3[0] + "-" + i1[0] + ")/(" + i3[1] + "-" + i1[1] + ")");
        drawRotated();

        var x11=(260/1660)*img.width;
        var v1 = verticalAxes((20/2340)*img.height,(400/2340)*img.height,x11,(20/2340)*img.height,(10/2340)*img.height);
        var y21=(250/2340)*img.height;
        var h1 = horizontalAxes((20/1660)*img.width,(400/1660)*img.width,y21,(20/1660)*img.width,(10/1660)*img.width);
        var x12=(1380/1660)*img.width;
        var v2 = verticalAxes((20/2340)*img.height,(400/2340)*img.height,x12,(20/2340)*img.height,(10/2340)*img.height);
        var y22=(250/2340)*img.height;
        var h2 = horizontalAxes((1260/1660)*img.width,(1640/1660)*img.width,y22,(20/1660)*img.width,(10/1660)*img.width);
        var x13=(260/1660)*img.width;
        var v3 = verticalAxes((1940/2340)*img.height,(2320/2340)*img.height,x13,(20/2340)*img.height,(10/2340)*img.height);
        var y23=(2070/2340)*img.height;
        var h3 = horizontalAxes((20/1660)*img.width,(400/1660)*img.width,y23,(20/1660)*img.width,(10/1660)*img.width);
        var x14=(1380/1660)*img.width;
        var v4 = verticalAxes((1940/2340)*img.height,(2300/2340)*img.height,x14,(20/2340)*img.height,(10/2340)*img.height);
        var y24=(2070/2340)*img.height;
        var h4 = horizontalAxes((1260/1660)*img.width,(1640/1660)*img.width,y24,(20/1660)*img.width,(10/1660)*img.width);
        var i1 = intersection(v1[0],v2[0],x11,x12,y21,y23,h1[0],h3[0]);
        var i2 = intersection(v1[0],v2[0],x11,x12,y22,y24,h2[(h2.length)-1],h4[(h4.length)-1]);
        var i3 = intersection(v3[(v3.length)-1],v4[(v4.length)-1],x13,x14,y23,y21,h3[0],h1[0]);
        var i4 = intersection(v3[(v3.length)-1],v4[(v4.length)-1],x13,x14,y24,y22,h4[(h4.length)-1],h2[(h2.length)-1]);
        sheet_corners = new Path(img.width,img.height, "red", 1, ctx);
        sheet_corners.moveTo(i1[0], i1[1]);
        sheet_corners.lineTo(i2[0], i2[1]);
        sheet_corners.lineTo(i4[0], i4[1]);
        sheet_corners.lineTo(i3[0], i3[1]);
        sheet_corners.lineTo(i1[0], i1[1]);
        sheet_corners.stroke();
        esq=i1;
        dx = i2[0] - i1[0];
        dy = i3[1] - i1[1];
        width = Math.round((20/1660)*img.width);
        height = Math.round((20/2340)*img.height);
        radius = Math.round((10/1660)*img.width);
        $("#width").val(width);
        $("#height").val(height);
        $("#radius").val(radius);
        init();
    }

    function Path(maxWidth, maxHeight, color, linewidth, drawingContext) {
        this.width = maxWidth;
        this.height = maxHeight;
        this.drawingCtx = drawingContext;
        this.points = [];
        this.canvas = document.createElement("canvas");
        this.canvas.width = maxWidth;
        this.canvas.height = maxHeight;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = linewidth;
        this.lastX;
        this.lastY;
    }
    Path.prototype.moveTo = function (x, y) {
        this.lastX = x;
        this.lastY = y;

    };
    Path.prototype.lineTo = function (x, y) {
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.lastX = x;
        this.lastY = y;
    };
    Path.prototype.stroke = function () {
        this.drawingCtx.drawImage(this.canvas, 0, 0);
    };

    function Box() {
      this.x = 0;
      this.y = 0;
      this.w = 1;
      this.h = 1;
      this.r = 0;
      this.shape;
      this.fill = '#444444';
      this.multiMark = '2';
      this.field_name = '';
      this.q_id;
      this.q_option;
    }

    Box.prototype.drawshape = function(context, shape, fill, shape_id) {
      context.fillStyle = fill;

      if (shape_id == 3 || shape_id == 4 || shape_id == 5 ||  shape_id == 10){
          context.globalAlpha=0.4;
      }else{
          context.globalAlpha=0.7;
      }

      if (shape.x > WIDTH || shape.y > HEIGHT) return;
      if (shape.x + shape.w < 0 || shape.y + shape.h < 0) return;

      context.fillRect(shape.x,shape.y,shape.w,shape.h);
      context.globalAlpha=1;
    };

    function Circle() {
      this.x = 0;
      this.y = 0;
      this.w = 0;
      this.h = 0;
      this.r = 1;
      this.shape;
      this.fill = '#444444';
      this.multiMark = '2';
      this.field_name = '';
      this.q_id;
      this.q_option;
    }

    Circle.prototype.drawshape = function(context, shape, fill) {
      context.fillStyle = fill;
      context.globalAlpha=0.7;
      if (shape.x > WIDTH || shape.y > HEIGHT) return;
      if (shape.x + shape.r < 0 || shape.y + shape.r < 0) return;

      context.beginPath();
      x=parseFloat(shape.x)+parseFloat(shape.r);
      y=parseFloat(shape.y)+parseFloat(shape.r);
      context.arc(x, y, shape.r, 0, 2 * Math.PI);

      context.lineWidth=0.1;
      context.fill();
      //context.strokeStyle = #ffffff;
      context.stroke();
      context.globalAlpha=1;
    };

    function addRect(x, y, w, h, fill, field, question, output, shape, multiMark) {
      var rect = new Box;
      rect.x = x;
      rect.y = y;
      rect.w = w;
      rect.h = h;
      rect.fill = fill;
      rect.multiMark = multiMark;
      rect.shape = shape;
      rect.field_name = field;
      rect.q_id = question;
      rect.q_option = output;
      boxes.push(rect);
      invalidate();
    }

    function addCircle(x, y, r, fill, field, question, output, shape, multiMark) {
      var circle = new Circle;
      circle.x = x;
      circle.y = y;
      circle.r = r;
      circle.fill = fill;
      circle.multiMark = multiMark;
      circle.shape = shape;
      circle.field_name = field;
      circle.q_id = question;
      circle.q_option = output;
      boxes.push(circle);
      invalidate();
    }

    function addArea(x, y, w, h, fill) {
      var rect = new Box;
      rect.x = x;
      rect.y = y;
      rect.w = w;
      rect.h = h;
      rect.fill = fill;
      boxes.push(rect);
      invalidate();
    }

    function addTempRect(x, y, w, h, r, fill, field, question, output, shape, multiMark) {
      var rect = new Box;
      rect.x = x;
      rect.y = y;
      rect.w = w;
      rect.h = h;
      rect.r = r;
      rect.fill = fill;
      rect.multiMark = multiMark;
      rect.shape = shape;
      rect.field_name = field;
      rect.q_id = question;
      rect.q_option = output;
      temp_boxes.push(rect);
    }

    function clear(c) {
      c.clearRect(0, 0, WIDTH, HEIGHT);
    }

    function draw() {
      if (canvasValid == false) {
        clear(ctx);
        // Add stuff you want drawn in the background all the time here
        ctx.save();
        ctx.translate(img.width/2,img.width/2);
        ctx.rotate(degrees);
        ctx.drawImage(img,-img.width/2,-img.width/2);
        ctx.restore();
        sheet_corners.stroke();
        // draw all boxes
        var l = boxes.length;
        for (var i = 0; i < l; i++) {
            boxes[i].drawshape(ctx, boxes[i], boxes[i].fill, boxes[i].shape);
        }

        // draw selection
        // right now this is just a stroke along the edge of the selected box
        /*if (mySel != null) {
          ctx.strokeStyle = mySelColor;
          ctx.lineWidth = mySelWidth;
          ctx.beginPath();
          ctx.arc(mySel.x+mySel.r,mySel.y+mySel.r,mySel.r,0,Math.PI*2,true);
          ctx.closePath();
          ctx.strokeStyle = "#c82124";
          ctx.stroke();
          ctx.strokeRect(mySel.x,mySel.y,mySel.w,mySel.h);
        }*/

        // Add stuff you want drawn on top all the time here


        canvasValid = true;
      }
    }

    function erase(){
        clear(gctx);
        var l = boxes.length;
        for (var i = l-1; i >= 0; i--) {
          // draw shape onto ghost context
          boxes[i].drawshape(gctx, boxes[i], 'black');

          // get image data at the mouse x,y pixel
          var imageData = gctx.getImageData(mx, my, 1, 1);
          var index = (mx + my * imageData.width) * 4;

          // if the mouse pixel exists, select and break
          if (imageData.data[3] > 0) {
            var fieldName = boxes[i].field_name;
            for (var js = 4 ; js < l ; js++) {
                if (boxes[js].field_name == fieldName){
                    boxes.splice(js,1);
                    invalidate();
                    js = 0;
                }
            }
            invalidate();
            return;
          }
        }
        clear(gctx);
        invalidate();
    }

    function myMove(e){
      if (isDrag){
        getMouse(e);

        for (var k = 0 ; k < mySel.length; k++){

            mySel[k].x = mx - offsetsx[k];
            mySel[k].y = my - offsetsy[k];
        }

        // something is changing position so we better invalidate the canvas!
        invalidate();
      }
    }

    function myDown(e){
      if (e.button==0){
        getMouse(e);
        clear(gctx);
        var l = boxes.length;
        for (var i = l-1; i >= 0; i--) {
          // draw shape onto ghost context
          boxes[i].drawshape(gctx, boxes[i], 'black');

          // get image data at the mouse x,y pixel
          var imageData = gctx.getImageData(mx, my, 1, 1);
          var index = (mx + my * imageData.width) * 4;

          // if the mouse pixel exists, select and break
          if (imageData.data[3] > 0) {
            for (var js = 0 ; js < l ; js++) {
                if (boxes[js].field_name == boxes[i].field_name){
                    mySel.push(boxes[js]);
                }
            }
            //alert (mySel.length);
            for (var k = 0 ; k < mySel.length; k++){
              offsetsx[k] = mx - mySel[k].x;
              offsetsy[k] = my - mySel[k].y;
              mySel[k].x = mx - offsetsx[k];
              mySel[k].y = my - offsetsy[k];
            }
            isDrag = true;
            canvas.onmousemove = myMove;
            invalidate();
            clear(gctx);
            return;
          }

        }
        // havent returned means we have selected nothing
        mySel = [];
        // clear the ghost canvas for next time
        clear(gctx);
        // invalidate because we might need the selection border to disappear
        invalidate();
      }else if(e.button==1) {
        getMouse(e);
        clear(gctx);
        var l = boxes.length;
        for (var i = l-1; i >= 0; i--) {
          // draw shape onto ghost context
          boxes[i].drawshape(gctx, boxes[i], 'black');

          // get image data at the mouse x,y pixel
          var imageData = gctx.getImageData(mx, my, 1, 1);
          var index = (mx + my * imageData.width) * 4;

          // if the mouse pixel exists, select and break
          if (imageData.data[3] > 0) {
            mySel.push(boxes[i])

            //alert (mySel.length);
            for (var k = 0 ; k < mySel.length; k++){
              offsetsx[k] = mx - mySel[k].x;
              offsetsy[k] = my - mySel[k].y;
              mySel[k].x = mx - offsetsx[k];
              mySel[k].y = my - offsetsy[k];
            }
            isDrag = true;
            canvas.onmousemove = myMove;
            invalidate();
            clear(gctx);
            return;
          }

        }
        // havent returned means we have selected nothing
        mySel = [];
        // clear the ghost canvas for next time
        clear(gctx);
        // invalidate because we might need the selection border to disappear
        invalidate();
      }else if(e.button==2) {
        getMouse(e);
        clear(gctx);
        var l = boxes.length;
        for (var i = l-1; i >= 0; i--) {
          // draw shape onto ghost context
          boxes[i].drawshape(gctx, boxes[i], 'black');

          // get image data at the mouse x,y pixel
          var imageData = gctx.getImageData(mx, my, 1, 1);
          var index = (mx + my * imageData.width) * 4;

          // if the mouse pixel exists, select and break
          if (imageData.data[3] > 0) {
            fsSel=boxes[i];
            for (var js = 0 ; js < l ; js++) {
                if (boxes[js].field_name == boxes[i].field_name){
                  if (boxes[js].shape!=10) {
                    if (boxes[js].q_option=="A"){
                        var output_up = 1;
                        js = l;
                    }else if (boxes[js].q_option=="0") {
                        var output_up = 2;
                        js = l;
                    }else {
                        var output_up = 3;
                    }
                  }
                    mySel.push(boxes[js]);
                }
            }
            //alert (mySel.length);
            $('#field_name_up').val(fsSel.field_name);
            $('#old_name').val(fsSel.field_name);
            if (fsSel.shape == 4 || fsSel.shape == 5){
              $('#multiMark_up').prop('disabled', true);
              $('#output_up').prop('disabled', true);
              $('#multiMark_up').val('');
              $('#output_up').val('');
            }else{
              $('#multiMark_up').prop('disabled', false);
              $('#output_up').prop('disabled', false);
              $('#multiMark_up').val(fsSel.multiMark);
              $('#output_up').val(output_up);
              $('#old_output').val(output_up);
            }
            $('#myModal3').modal('show');

            isDrag = false;
            canvas.onmousemove = null;
            invalidate();
            clear(gctx);
            mySel = [];
            return;
          }

        }
        // havent returned means we have selected nothing
        mySel = [];
        // clear the ghost canvas for next time
        clear(gctx);
        // invalidate because we might need the selection border to disappear
        invalidate();
      }
    }

    function myUp(){
      isDrag = false;
      canvas.onmousemove = null;
      mySel = [];
    }

    function updateField(){
      $('#myModal3').modal('hide');
      var l = boxes.length;
      for (var i = 0 ; i < l ; i++) {
        if (boxes[i].field_name == $('#old_name').val()){
          boxes[i].field_name= $('#field_name_up').val();
          boxes[i].multiMark=$('#multiMark_up').val();
          if (boxes[i].shape!=10) {
            if ($('#old_output').val() != $('#output_up').val()){
              if ($('#old_output').val() == "2" && $('#output_up').val() == "3"){
                boxes[i].q_option=(parseInt(boxes[i].q_option)+1).toString();
              }else if ($('#old_output').val() == "3" && $('#output_up').val() == "2"){
                boxes[i].q_option=(parseInt(boxes[i].q_option)-1).toString();
              }else if ($('#old_output').val() == "2" && $('#output_up').val() == "1"){
                boxes[i].q_option=String.fromCharCode(65 + parseInt(boxes[i].q_option));
              }else if ($('#old_output').val() == "3" && $('#output_up').val() == "1"){
                boxes[i].q_option=String.fromCharCode(64 + parseInt(boxes[i].q_option));
              }else if ($('#old_output').val() == "1" && $('#output_up').val() == "2"){
                boxes[i].q_option=(boxes[i].q_option.charCodeAt(0) - 65).toString();
              }else if ($('#old_output').val() == "1" && $('#output_up').val() == "3"){
                boxes[i].q_option=(boxes[i].q_option.charCodeAt(0) - 64).toString();
              }
            }
          }
        }
      }
    }

    function duplicateRect(){
        var output = document.getElementById("output").value;
        var rows = document.getElementById("rows").value;
        var columns = document.getElementById("columns").value;
        if (rows == 1 && columns > 1){
            var x_dist = -(boxes[2].x - boxes[3].x)/(columns-1);
            var y_dist = 0;
        }else if(columns ==1 && rows > 1){
            var x_dist = 0;
            var y_dist = -(boxes[2].y - boxes[3].y)/(rows-1);
        }else if(columns ==1 && rows == 1){
            var x_dist = 0;
            var y_dist = 0;
        }else{
            var x_dist = -(boxes[2].x - boxes[3].x)/(columns-1);
            var y_dist = -(boxes[2].y - boxes[3].y)/(rows-1);
        }
        var inxy = [boxes[2].x,boxes[2].y];
        var field_name = document.getElementById("field_name").value;
        var field_orientation = document.getElementById("field_orientation").value;
        var multiMark = document.getElementById("multiMark").value;
        addRect(boxes[2].x-width, boxes[2].y-height, (boxes[3].x - boxes[2].x) + 3*width, (boxes[3].y - boxes[2].y) + 3*height, '#91e57b', field_name, 0 ,  0, 10, multiMark);
        boxes[2].x=10000;
        boxes[3].y=10000;
        invalidate();
        //var field_output = document.getElementById("field_field_output").value;
        for (var k = 0 ; k<rows; k++){
            var tempy = inxy[1] + (k*y_dist);
            for (var h = 0 ; h<columns; h++){
                var tempx = inxy[0] + (h*x_dist);
                //alert ("x,y = (" + tempx + "," + tempy + ")");
                if (field_orientation == 1){
                    if (output==1){
                       var que = String.fromCharCode(65 + h);
                    }else if(output==2){
                       var que = h;
                    }else if(output==3){
                       var que = h+1;
                    }
                    addRect(tempx, tempy, width, height, '#256b2d', field_name, k+1, que, 1, multiMark);
                }else if (field_orientation == 2){
                    if (output==1){
                       var que = String.fromCharCode(65 + k);
                    }else if(output==2){
                       var que = k;
                    }else if(output==3){
                       var que = k+1;
                    }
                    addRect(tempx, tempy, width, height, '#256b2d', field_name, h+1, que, 1, multiMark);
                }
            }
        }
        area_boxes_count = 0;
        document.getElementById("rows").value = "";
        document.getElementById("columns").value = "";
        document.getElementById("field_name").value = "";
        document.getElementById("field_orientation").value = "";
        document.getElementById("multiMark").value = "";
        $('#commands').show();
        $('#cancel').hide();
        $("#markwidth").hide();
        $("#markheight").hide();
        $("#markradius").hide();
    }

    function duplicateCircle(){
        var output = document.getElementById("output").value;
        var rows = document.getElementById("rows").value;
        var columns = document.getElementById("columns").value;
        if (rows == 1 && columns > 1){
            var x_dist = -(boxes[0].x - boxes[1].x)/(columns-1);
            var y_dist = 0;
        }else if(columns ==1 && rows > 1){
            var x_dist = 0;
            var y_dist = -(boxes[0].y - boxes[1].y)/(rows-1);
        }else if(columns ==1 && rows == 1){
            var x_dist = 0;
            var y_dist = 0;
        }else{
            var x_dist = -(boxes[0].x - boxes[1].x)/(columns-1);
            var y_dist = -(boxes[0].y - boxes[1].y)/(rows-1);
        }
        var inxy = [boxes[0].x,boxes[0].y];
        var field_name = document.getElementById("field_name").value;
        var field_orientation = document.getElementById("field_orientation").value;
        var multiMark = document.getElementById("multiMark").value;
        addRect(boxes[0].x-width, boxes[0].y-height, (boxes[1].x - boxes[0].x) + 3*width, (boxes[1].y - boxes[0].y) + 3*height, '#91e57b', field_name, 0, 0, 10, multiMark);
        boxes[0].x=10000;
        boxes[1].y=10000;
        invalidate();
        //var field_output = document.getElementById("field_field_output").value;
        for (var k = 0 ; k<rows; k++){
            var tempy = inxy[1] + (k*y_dist);
            for (var h = 0 ; h<columns; h++){
                var tempx = inxy[0] + (h*x_dist);
                //alert ("x,y = (" + tempx + "," + tempy + ")");
                if (field_orientation == 1){
                    if (output==1){
                       var que = String.fromCharCode(65 + h);
                    }else if(output==2){
                       var que = h;
                    }else if(output==3){
                       var que = h+1;
                    }
                    addCircle(tempx, tempy, radius, '#256b2d', field_name, k+1, que, 2, multiMark);
                }else if (field_orientation == 2){
                    if (output==1){
                       var que = String.fromCharCode(65 + k);
                    }else if(output==2){
                       var que = k;
                    }else if(output==3){
                       var que = k+1;
                    }
                    addCircle(tempx, tempy, radius, '#256b2d', field_name, h+1, que, 2, multiMark);
                }
            }
        }
        area_boxes_count = 0;
        document.getElementById("rows").value = "";
        document.getElementById("columns").value = "";
        document.getElementById("field_name").value = "";
        document.getElementById("field_orientation").value = "";
        document.getElementById("multiMark").value = "";
        $('#commands').show();
        $('#cancel').hide();
        $("#markwidth").hide();
        $("#markheight").hide();
        $("#markradius").hide();
    }

    function crateArea(shape_id, fill){
        var field_name = document.getElementById("field_name").value;
        addRect(boxes[0].x+width/2, boxes[0].y+height/2, (boxes[1].x - boxes[0].x), (boxes[1].y - boxes[0].y), fill , field_name,0, 0, shape_id, "2");
        //addRect(boxes[0].x+width/2, boxes[0].y+height/2, (boxes[1].x - boxes[0].x) + 3/2*width, (boxes[1].y - boxes[0].y) + 3/2*height, '#579ad1', field_name, k+1, h+1, 3);
        boxes[0].x=10000;
        boxes[1].y=10000;
        invalidate();
        area_boxes_count = 0;
        document.getElementById("rows").value = "";
        document.getElementById("columns").value = "";
        document.getElementById("field_name").value = "";
        document.getElementById("field_orientation").value = "";
        $('#commands').show();
        $('#cancel').hide();
        $("#markwidth").hide();
        $("#markheight").hide();
        $("#markradius").hide();
    }

    function myDblClick(e) {
        shape = document.getElementById("shape").value;
        getMouse(e);
        // for this method width and height determine the starting X and Y, too.
        // so I left them as vars in case someone wanted to make them args for something and copy this code
        if (shape == 1){
            area_boxes_count++;
            if (area_boxes_count==1){
                boxes[2].x=mx - radius;
                boxes[2].y=my - radius;
                invalidate();
            }else if(area_boxes_count==2){
                boxes[3].x=mx - radius;
                boxes[3].y=my - radius;
                invalidate();
            }if (area_boxes_count==3){
                duplicateRect();
                document.getElementById("shape").value = "";
            }
        }else if(shape == 2){
            area_boxes_count++;
            if (area_boxes_count==1){
                boxes[0].x=mx - radius;
                boxes[0].y=my - radius;
                invalidate();
            }else if(area_boxes_count==2){
                boxes[1].x=mx - radius;
                boxes[1].y=my - radius;
                invalidate();
            }if (area_boxes_count==3){
                duplicateCircle();
                document.getElementById("shape").value = "";
            }
        }else if(shape == 3){
            area_boxes_count++;
            if (area_boxes_count==1){
                boxes[0].x=mx - radius;
                boxes[0].y=my - radius;
                invalidate();
            }else if(area_boxes_count==2){
                boxes[1].x=mx - radius;
                boxes[1].y=my - radius;
                invalidate();
            }if (area_boxes_count==3){
                crateArea(shape, '#579ad1');
                document.getElementById("shape").value = "";
            }
        }else if(shape == 4){
            area_boxes_count++;
            if (area_boxes_count==1){
                boxes[0].x=mx - radius;
                boxes[0].y=my - radius;
                invalidate();
            }else if(area_boxes_count==2){
                boxes[1].x=mx - radius;
                boxes[1].y=my - radius;
                invalidate();
            }if (area_boxes_count==3){
                crateArea(shape, '#a815a8');
                document.getElementById("shape").value = "";
            }
        }else if(shape == 5){
            area_boxes_count++;
            if (area_boxes_count==1){
                boxes[0].x=mx - radius;
                boxes[0].y=my - radius;
                invalidate();
            }else if(area_boxes_count==2){
                boxes[1].x=mx - radius;
                boxes[1].y=my - radius;
                invalidate();
            }if (area_boxes_count==3){
                crateArea(shape, '#d8772d');
                document.getElementById("shape").value = "";
            }
        }else if(shape == 6){
                erase();
        }
    }

    function invalidate() {
      canvasValid = false;
    }

    function getMouse(e) {
          var element = canvas, offsetX = 0, offsetY = 0;

          if (element.offsetParent) {
            do {
              offsetX += element.offsetLeft;
              offsetY += element.offsetTop;
            } while ((element = element.offsetParent));
          }

          // Add padding and border style widths to offset
          offsetX += stylePaddingLeft;
          offsetY += stylePaddingTop;

          offsetX += styleBorderLeft;
          offsetY += styleBorderTop;

          mx = e.pageX - offsetX;
          my = e.pageY - offsetY
    }

    function saveform(deleteHTML, updateHTML) {
        $('#loading').modal('show');
        if (boxes.length <5){
            alert ("No ha realizado cambios");
            $('#loading').modal('hide');
            return;
        }
        var token = $( "input[name='_token']" ).val();

        $.ajax({
            async: false,
            url: deleteHTML,
            headers: {"X-CSRF-TOKEN": token},
            type: 'PUT',
        });

        var postData = [];
        for (i = 4 ; i<boxes.length; i++){
            var x = (boxes[i].x-esq[0])/dx;
            var y = (boxes[i].y-esq[1])/dy;
            var w = boxes[i].w/dx;
            var h = boxes[i].h/dy;
            var r = boxes[i].r/dx;
            postData.push({field_name:boxes[i].field_name, x: x, y: y, w: w, h: h, r: r, shape: boxes[i].shape, fill: boxes[i].fill.substring(1), multiMark: boxes[i].multiMark, q_id: boxes[i].q_id, q_option: boxes[i].q_option, _token: token});
        }

        $.ajax({
            async: true,
            url: updateHTML,
            headers: {"X-CSRF-TOKEN": token},
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(postData)
        }).always(function() {
            $('#loading').modal('hide');
        });
    }

    function set_tables(){
        var temp_q_id=0;
        var temp1 = "";
        for (var j=0; j<relativeCoord.length; j++){
            if (relativeCoord[j][8]>2){
                break;
            }
            var temp2 = relativeCoord[j][5] + "-" + relativeCoord[j][6];
            if (temp2!=temp1){
                temp_q_id=0;
            }
            if (temp_q_id==0){
                var th = document.createElement('th');
                th.appendChild(document.createTextNode(relativeCoord[j][5] + "  " + relativeCoord[j][6]));
                document.getElementById('resultsFormOmrHead').appendChild(th);
                temp1 = relativeCoord[j][5] + "-" + relativeCoord[j][6];
                temp_q_id=1;
            }
        }
        var temp_q_id=0;
        var temp1 = "";
        for (var j=0; j<relativeCoord.length; j++){
            if (relativeCoord[j][8]<=3){
                continue;
            }
            if (relativeCoord[j][8]>4){
                break;
            }
            var temp2 = relativeCoord[j][5] + "-" + relativeCoord[j][6];
            if (temp2!=temp1){
                temp_q_id=0;
            }
            if (temp_q_id==0){
                var th = document.createElement('th');
                th.appendChild(document.createTextNode(relativeCoord[j][5]));
                document.getElementById('resultsFormOcrHead').appendChild(th);
                temp1 = relativeCoord[j][5] + "-" + relativeCoord[j][6];
                temp_q_id=1;
            }
        }
        var temp_q_id=0;
        var temp1 = "";
        for (var j=0; j<relativeCoord.length; j++){
            if (relativeCoord[j][8]<=4){
                continue;
            }
            if (relativeCoord[j][8]>5){
                break;
            }
            var temp2 = relativeCoord[j][5] + "-" + relativeCoord[j][6];
            if (temp2!=temp1){
                temp_q_id=0;
            }
            if (temp_q_id==0){
                var th = document.createElement('th');;
                th.appendChild(document.createTextNode(relativeCoord[j][5]));
                document.getElementById('resultsFormBcrHead').appendChild(th);
                temp1 = relativeCoord[j][5] + "-" + relativeCoord[j][6];
                temp_q_id=1;
            }
        }
    }

    function read() {
        $('#redForm_run').hide();
        $('#results').show();
        imgs = document.getElementsByName('forms');
        var canvas = document.createElement("canvas");
        //var canvas = document.getElementById("borrar");
        var iterations=imgs.length;
        var i = 0;

        (function loop() {
            var x_y = imgs[i].width/imgs[i].height;
            if(x_y>MAX_RATIO_A4 || x_y<MIN_RATIO_A4) {
                if(x_y>MAX_RATIO_LETTER || x_y<MIN_RATIO_LETTER) {
                    alert("No se pude procesar la hoja No. " + i + ", el tama単o debe ser A4 o Carta");
                    i++;
                    setTimeout(loop, 0);
                    return;
                }
            }
            prepare_sheet(i, canvas, imgs[i], relativeCoord);
            i++;
            if (i < iterations) {
                setTimeout(loop, 0);
            }
        })();
    }

    function prepare_sheet(i, canvas, img, relativeCoord2){
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        preview.style.width = img.width + "px";
        preview.style.height = img.height + "px";
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        var x11=(260/1660)*img.width;
        var v1 = verticalAxes((20/2340)*img.height,(400/2340)*img.height,x11,(20/2340)*img.height,(10/2340)*img.height);
        var y21=(250/2340)*img.height;
        var h1 = horizontalAxes((20/1660)*img.width,(400/1660)*img.width,y21,(20/1660)*img.width,(10/1660)*img.width);
        var x12=(1380/1660)*img.width;
        var v2 = verticalAxes((20/2340)*img.height,(400/2340)*img.height,x12,(20/2340)*img.height,(10/2340)*img.height);
        var x13=(260/1660)*img.width;
        var v3 = verticalAxes((1940/2340)*img.height,(2320/2340)*img.height,x13,(20/2340)*img.height,(10/2340)*img.height);
        var y23=(2070/2340)*img.height;
        var h3 = horizontalAxes((20/1660)*img.width,(400/1660)*img.width,y23,(20/1660)*img.width,(10/1660)*img.width);
        var x14=(1380/1660)*img.width;
        var v4 = verticalAxes((1940/2340)*img.height,(2300/2340)*img.height,x14,(20/2340)*img.height,(10/2340)*img.height);
        var i1 = intersection(v1[0],v2[0],x11,x12,y21,y23,h1[0],h3[0]);
        var i3 = intersection(v3[(v3.length)-1],v4[(v4.length-1)],x13,x14,y23,y21,h3[0],h1[0]);

        degrees = -Math.atan(-1*(i3[0]-i1[0])/(i3[1]-i1[1]));
        drawRotated2(img,degrees);

        var x11=(260/1660)*img.width;
        var v1 = verticalAxes((20/2340)*img.height,(400/2340)*img.height,x11,(20/2340)*img.height,(10/2340)*img.height);
        var y21=(250/2340)*img.height;
        var h1 = horizontalAxes((20/1660)*img.width,(400/1660)*img.width,y21,(20/1660)*img.width,(10/1660)*img.width);
        var x12=(1380/1660)*img.width;
        var v2 = verticalAxes((20/2340)*img.height,(400/2340)*img.height,x12,(20/2340)*img.height,(10/2340)*img.height);
        var y22=(250/2340)*img.height;
        var h2 = horizontalAxes((1260/1660)*img.width,(1640/1660)*img.width,y22,(20/1660)*img.width,(10/1660)*img.width);
        var x13=(260/1660)*img.width;
        var v3 = verticalAxes((1940/2340)*img.height,(2320/2340)*img.height,x13,(20/2340)*img.height,(10/2340)*img.height);
        var y23=(2070/2340)*img.height;
        var h3 = horizontalAxes((20/1660)*img.width,(400/1660)*img.width,y23,(20/1660)*img.width,(10/1660)*img.width);
        var x14=(1380/1660)*img.width;
        var v4 = verticalAxes((1940/2340)*img.height,(2300/2340)*img.height,x14,(20/2340)*img.height,(10/2340)*img.height);
        var y24=(2070/2340)*img.height;
        var h4 = horizontalAxes((1260/1660)*img.width,(1640/1660)*img.width,y24,(20/1660)*img.width,(10/1660)*img.width);
        var i1 = intersection(v1[0],v2[0],x11,x12,y21,y23,h1[0],h3[0]);
        var i2 = intersection(v1[0],v2[0],x11,x12,y22,y24,h2[(h2.length)-1],h4[(h4.length)-1]);
        var i3 = intersection(v3[(v3.length)-1],v4[(v4.length)-1],x13,x14,y23,y21,h3[0],h1[0]);
        var i4 = intersection(v3[(v3.length)-1],v4[(v4.length)-1],x13,x14,y24,y22,h4[(h4.length)-1],h2[(h2.length)-1]);
        var esq=i1;
        var dx = i2[0] - i1[0];
        var dy = i3[1] - i1[1];

        omrRead(i,  esq, dx, dy, relativeCoord2);
        bcrRead(i,  esq, dx, dy, relativeCoord2);
        ocrRead(i,  esq, dx, dy, relativeCoord2);
    }

    function is_box_black_corner(x,y,x_box,y_box){
        x = Math.round(x);
        y = Math.round(y);
        x_box = Math.round(x_box);
        y_box = Math.round(y_box);
        var data = ctx.getImageData(x, y, x_box, y_box).data;
        var counter=0;
        for (var xx=0; xx<data.length; xx++){
            var yy = xx*4;
	    counter+= data[yy]<50 & data[yy+1]<50 &data[yy+2]<50;
        }
        return counter;
    }

    function progressUpdate(packet){
           return packet.data.text;
    }

    function ocrRead (i,  esq, dx, dy, relativeCoord2){
        var tr = document.createElement('tr');
        for (var j=0; j<relativeCoord2.length; j++){
            if (relativeCoord2[j][8]<=3){
                continue;
            }
            if (relativeCoord2[j][8]>4){
                break;
            }
            var width = (relativeCoord2[j][2]*dx);
            var height = (relativeCoord2[j][3]*dy);
            var newCanvas = document.createElement("canvas");
            newCanvas.width = width;
            newCanvas.height = height;
            var imageData = ctx.getImageData((relativeCoord2[j][0]*dx)+esq[0], (relativeCoord2[j][1]*dy)+esq[1], width, height);
            newCanvas.getContext("2d").putImageData(imageData, 0, 0);
            ocrRead2(newCanvas,tr);
        }
    }

    function ocrRead2 (newCanvas, tr){
        var langsel = document.getElementById("langsel").value;
        Tesseract.recognize(newCanvas, {
        lang: langsel})
        .then(function(data){
            console.log(data);
            temp = progressUpdate({ status: 'done', data: data });
            var td = document.createElement('td');
            temp = temp;
            td.appendChild(document.createTextNode(temp));
            tr.appendChild(td);
            document.getElementById('resultsFormOcrBody').appendChild(tr);
        });
    }

    function bcrRead (i,  esq, dx, dy, relativeCoord2){
        var tr = document.createElement('tr');
        for (var j=0; j<relativeCoord2.length; j++){
            if (relativeCoord2[j][8]<=4){
                continue;
            }
            if (relativeCoord2[j][8]>5){
                break;
            }
            var width = (relativeCoord2[j][2]*dx);
            var height = (relativeCoord2[j][3]*dy);
            var newCanvas = document.createElement("canvas");
            newCanvas.width = width;
            newCanvas.height = height;
            var imageData = ctx.getImageData((relativeCoord2[j][0]*dx)+esq[0], (relativeCoord2[j][1]*dy)+esq[1], width, height);
            newCanvas.getContext("2d").putImageData(imageData, 0, 0);
            var qrImg = newCanvas.toDataURL();
            bcrRead2(qrImg,tr);
        }
    }

    function bcrRead2 (qrImg,tr){
        var qr = new QCodeDecoder();
        qr.decodeFromImage(qrImg, function (err, result) {
            //if (err) throw err;
            var td = document.createElement('td');
            temp = result;
            console.log(temp);
            if (err){
               td.appendChild(document.createTextNode(''));
            }else{
               td.appendChild(document.createTextNode(temp));
            }
            tr.appendChild(td);
            document.getElementById('resultsFormBcrBody').appendChild(tr);
        });
    }

    function omrRead (i,  esq, dx, dy, relativeCoord2){
        var darkness = document.getElementById("darkness").value;
        var tr = document.createElement('tr');
        var temp_q_id=0;
        var temp1 = "";
        var qtemp = "";
        var ocrTemp = [];
        for (var j=0; j<relativeCoord2.length; j++){
            if (relativeCoord2[j][8]>2){
                if (temp2!='finish'){
                    var temp2 = relativeCoord2[j][5] + "-" + relativeCoord2[j][6];
                }
                if (temp2!=temp1){
                    temp_q_id=0;
                    var td = document.createElement('td');
                    var markTempCount = 0;
                    var markTemp =[];
                    for (var qt=0; qt<ocrTemp.length; qt++){
                        if (ocrTemp[qt][0] >= (ocrTemp[qt][4]*ocrTemp[qt][5]*(darkness/100))){
                            markTempCount++;
                            markTemp.push(ocrTemp[qt][1]);
                        }
                    }
                    if (markTempCount==0){
                       qtemp = '';
                    }else if (markTempCount==1){
                       qtemp = markTemp[0];
                    }else if (markTempCount>1 && ocrTemp[0][3]==0){
                       qtemp = 'M';
                    }else if (markTempCount>1 && ocrTemp[0][3]==1){
                       for (var mt = 0; mt<markTemp.length ; mt++){
                           if (mt == 0){
                               qtemp = markTemp[mt];
                           }else{
                               qtemp =qtemp + "," + markTemp[mt];
                           }
                       }
                    }
                    td.appendChild(document.createTextNode(qtemp));
                    tr.appendChild(td);
                    ocrTemp = [];
                    qtemp = "";
                    temp1='finish';
                    temp2='finish';
                }
                break;
            }
            var width = (relativeCoord2[j][2]*dx);
            var height = (relativeCoord2[j][3]*dy);
            var radius = (relativeCoord2[j][4]*dx);
            var temp2 = relativeCoord2[j][5] + "-" + relativeCoord2[j][6];
            if (temp_q_id==0){
                if (relativeCoord2[j][8]==1){
                    ocrTemp.push([is_box_black_corner((relativeCoord2[j][0]*dx)+esq[0], (relativeCoord2[j][1]*dy)+esq[1], width, height),relativeCoord2[j][7],relativeCoord2[j][8],relativeCoord2[j][9],width,height]);
                } else if (relativeCoord2[j][8]==2){
                    ocrTemp.push([is_box_black_corner((relativeCoord2[j][0]*dx)+esq[0], (relativeCoord2[j][1]*dy)+esq[1], radius*2, radius*2),relativeCoord2[j][7],relativeCoord2[j][8],relativeCoord2[j][9],radius*2, radius*2]);
                }
                temp1 = relativeCoord2[j][5] + "-" + relativeCoord2[j][6];
                temp_q_id=1;
            }else  if (temp2!=temp1){
                temp_q_id=0;
                var td = document.createElement('td');
                var markTempCount = 0;
                var markTemp =[];
                for (var qt=0; qt<ocrTemp.length; qt++){
                    if (ocrTemp[qt][0] >= (ocrTemp[qt][4]*ocrTemp[qt][5]*(darkness/100))){
                        markTempCount++;
                        markTemp.push(ocrTemp[qt][1]);
                    }
                }
                if (markTempCount==0){
                   qtemp = '';
                }else if (markTempCount==1){
                   qtemp = markTemp[0];
                }else if (markTempCount>1 && ocrTemp[0][3]==0){
                   qtemp = 'M';
                }else if (markTempCount>1 && ocrTemp[0][3]==1){
                   for (var mt = 0; mt<markTemp.length ; mt++){
                       if (mt == 0){
                           qtemp = markTemp[mt];
                       }else{
                           qtemp =qtemp + "," + markTemp[mt];
                       }
                   }
                }
                td.appendChild(document.createTextNode(qtemp));
                tr.appendChild(td);
                ocrTemp = [];
                qtemp = "";
                if (relativeCoord2[j][8]==1){
                    ocrTemp.push([is_box_black_corner((relativeCoord2[j][0]*dx)+esq[0], (relativeCoord2[j][1]*dy)+esq[1], width, height),relativeCoord2[j][7],relativeCoord2[j][8],relativeCoord2[j][9],width,height]);
                } else if (relativeCoord2[j][8]==2){
                    ocrTemp.push([is_box_black_corner((relativeCoord2[j][0]*dx)+esq[0], (relativeCoord2[j][1]*dy)+esq[1], radius*2, radius*2),relativeCoord2[j][7],relativeCoord2[j][8],relativeCoord2[j][9],radius*2, radius*2]);
                }
            }else if (temp2==temp1 && temp_q_id!=0){
                if (relativeCoord2[j][8]==1){
                    ocrTemp.push([is_box_black_corner((relativeCoord2[j][0]*dx)+esq[0], (relativeCoord2[j][1]*dy)+esq[1], width, height),relativeCoord2[j][7],relativeCoord2[j][8],relativeCoord2[j][9],width,height]);
                } else if (relativeCoord2[j][8]==2){
                    ocrTemp.push([is_box_black_corner((relativeCoord2[j][0]*dx)+esq[0], (relativeCoord2[j][1]*dy)+esq[1], radius*2, radius*2),relativeCoord2[j][7],relativeCoord2[j][8],relativeCoord2[j][9],radius*2, radius*2]);
                }
            }
        }
        document.getElementById('resultsFormOmrBody').appendChild(tr);
    }