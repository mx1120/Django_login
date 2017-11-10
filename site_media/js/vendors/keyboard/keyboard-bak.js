define(function(require,exports,module){
	$(function(){
		var $wordInput = $('#wordInput'),
            $keyboard = $('#keyboard'),
            $keyboardBtn = $keyboard.find('button:not([keyCode="20"])'),
            $capsLock = $keyboard.find('button[keyCode="20"]'),
			capslock = false,
            timer1 = null,
            timer2 = null;
        $keyboard.find('button[keyCode="20"]').click(function(){

            if(!$('#capsLockTips').is(':hidden')){
                $(this).removeClass('lock');
                $('.letter').removeClass('uppercase');
                $('#capsLockTips').hide();
                capslock = true;
                return false;
            }else{
                $(this).addClass('lock');
                $('.letter').addClass('uppercase');
                $('#capsLockTips').show();
            }

        });
        $keyboardBtn.click(function(){
			var $this = $(this),
				character = $this.html(); // If it's a lowercase letter, nothing happens to this variable

            clearTimeout(timer1);
            timer1 = setTimeout(function(){
                $this.removeClass('on');
            },100);
			// Caps lock


			// Delete
            if ($this.hasClass('delete')) {
                var val = $wordInput.val();
                $wordInput.val(val.substr(0, val.length - 1));
                return false;
            }

            // enter
            if ($this.hasClass('enter')) {
                return false;
            }

			// Special characters
			if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
			if ($this.hasClass('space')) character = ' ';

			// Uppercase letter
			if ($this.hasClass('uppercase') || !$('#capsLockTips').is(':hidden')){
                character = character.toUpperCase()
            }

			// Add the character
			$wordInput.val($wordInput.val() + character);
            //输入框聚焦状态 box-shadow: 0 2px 2px 2px #ccc inset;
            if($wordInput.val() == ''){
                $wordInput.css({'box-shadow':'0 2px 2px 2px #ccc inset'});
            }else{
                $wordInput.css({'box-shadow':'0 2px 2px 2px #ccc inset'})
            }
		});
        /*大写键锁定提醒*/
        $wordInput.keypress(function(e){
            detectCapsLock(e)
        });
        $('#exchangeWord').keypress(function(e){
            detectCapsLock(e)
        });
        function detectCapsLock(e){
            var keyCode  =  e.keyCode||e.which; // 按键的keyCode
            var isShift  =  e.shiftKey ||(keyCode  ==   16 ) || false ; // shift键是否按住
            if (((keyCode >=   65   &&  keyCode  <=   90 )  &&   !isShift) // Caps Lock 打开，且没有按住shift键
                || ((keyCode >=   97   &&  keyCode  <=   122 )  &&  isShift)// Caps Lock 打开，且按住shift键
                ){
                $('#capsLockTips').show();
            }else{
                $('#capsLockTips').hide();
            }
        }
        //实体键盘与软键盘的交互
        $(document).keydown(function(event){
            if ($keyboard.is(':hidden')) {return false}
            $('#wordInput').focus();
            var $key = $keyboard.find('button[keyCode = '+ event.which +']');
            function curKey(){

                $key.addClass('on');
                clearTimeout(timer2);
                timer2 = setTimeout(function(){
                    $key.removeClass('on');
                },200);
                $('#exchangeWord').focus();
                var singleW = '';
                var str = '';
                var exW = $('#exchangeWord').val();
                singleW = exW.substr(exW.length-1);
                if($capsLock.hasClass('lock')){
                    str =  $wordInput.val()+singleW.toUpperCase();
                }else{
                    str =  $wordInput.val() + singleW;
                }
                $wordInput.val(str);
                if(event.which == 20){

                    if($capsLock.hasClass('lock')){
                        $capsLock.removeClass('lock');
                        $keyboardBtn.removeClass('uppercase');
                    }else{
                        $capsLock.addClass('lock');

                        //$capsLock.toggleClass('on uppercase');
                        $keyboardBtn.addClass('uppercase');
                    }

                }
            }
            //键盘键值
            switch (event.which){
                case 65 :curKey();//字母A
                    break;
                case 66 :curKey();
                    break;
                case 67 :curKey();
                    break;
                case 68 :curKey();
                    break;
                case 69 :curKey();
                    break;
                case 70 :curKey();
                    break;
                case 71 :curKey();
                    break;
                case 72 :curKey();
                    break;
                case 73 :curKey();
                    break;
                case 74 :curKey();
                    break;
                case 75 :curKey();
                    break;
                case 76 :curKey();
                    break;
                case 77 :curKey();
                    break;
                case 78 :curKey();
                    break;
                case 79 :curKey();
                    break;
                case 80 :curKey();
                    break;
                case 81 :curKey();
                    break;
                case 82 :curKey();
                    break;
                case 83 :curKey();
                    break;
                case 84 :curKey();
                    break;
                case 85 :curKey();
                    break;
                case 86 :curKey();
                    break;
                case 87 :curKey();
                    break;
                case 88 :curKey();
                    break;
                case 89 :curKey();
                    break;
                case 90 :curKey();//字母Z
                    break;
                case 32 :curKey();//空格键
                    break;
                case 46 :curKey();//Delete键
                    break;
                case 13 :curKey();//回车键
                    break;
                case 20 :curKey();// Cpas Lock
                    break;

            }
        }).keyup(function(){
            $keyboard.find('button.on').removeClass('on');  //处理按键过快，导致的软键盘按钮状态没法恢复
        });

        /*$(document).keyup(function(event){
            if(event.which > 64 && event.which < 91){
                var $key = $('#keyboard').find('button[keyCode = '+ event.which +']');
                var str = $wordInput.val();
                var len = str.length;
                var before = str.slice(0,len-1);
                var last = str.slice(-1);//取出最后一个字符
                if($key.hasClass('uppercase')){
                    last = last.toUpperCase();
                }else {
                    last = last.toLowerCase();
                }
                $wordInput.val(before+last);
            }

        });*/
        //判断IE是否支持placeholder
        function isPlaceholderSupport() {
            return 'placeholder' in document.createElement('input');
        }
        if(!isPlaceholderSupport()){
            $wordInput.val('输入听到的单词').css({'color':'#888'});
            $wordInput.focus(function(){
                if($wordInput.val() == '输入听到的单词'){
                    $wordInput.val('').css({'color':''});
                }
            }).blur(function(){
                if($wordInput.val() == ''){
                    $wordInput.val('输入听到的单词').css({'color':'#888'});
                }
            })
        }
    });
});

