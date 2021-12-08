/**
 * Created by Mirza on 24/05/2015.
 */

$(function () {
    var App = window;
    var designerTool = App.designerTool = {
        sections: {
            selectedSVG: {
                selectedLayoutHolder: $('#selected-layout-holder'),
                txtToEdit: $('#selected-layout-holder .ui-draggable'),
                objSvg: $('#selected-svg'),
                onTextClick: function (txt_to_edit) {
                    $('.ui-draggable').removeClass('selected_text, selected_image');
                    txt_to_edit.addClass('selected_text');

                    // hide handles
                    $('div.ui-rotatable-handle, div.ui-resizable-handle').addClass('hide-handles');
                    txt_to_edit.find('div.ui-rotatable-handle').removeClass('hide-handles');

                    designerTool.sections.toolOptions.showEditTextTab(txt_to_edit);

                    // Reset Image Tab Settings in case if already editing image
                    designerTool.sections.toolOptions.onClickAddNewImage();
                    designerTool.sections.toolOptions.sectionNewImageInfo.removeClass('dead');
                    designerTool.sections.toolOptions.sectionEditImageInfo.addClass('dead');
                },
                onImageClick: function (image_to_edit) {
                    $('.ui-draggable').removeClass('selected_image, selected_text');

                    image_to_edit.addClass('selected_image');
                    designerTool.sections.toolOptions.showEditImageTab(image_to_edit);

                    // hide handles
                    $('div.ui-rotatable-handle, div.ui-resizable-handle').addClass('hide-handles');
                    image_to_edit.find('div.ui-rotatable-handle').removeClass('hide-handles');
                    image_to_edit.find('div.ui-resizable-handle').removeClass('hide-handles');

                    // Reset Text Tab Settings in case if already editing Text
                    designerTool.sections.toolOptions.resetTextOptions();
                    designerTool.sections.toolOptions.sectionNewTextInfo.removeClass('dead');
                    designerTool.sections.toolOptions.sectionEditTextInfo.addClass('dead');


                },
                onImageMouseOver: function(selectedImage){
                    //selectedImage.attr('style', 'border-width:5px; border-style:dashed;');
                },
                onImageMouseOut: function(selectedImage){
                    //selectedImage.attr('style', 'border-width:0px; border-style:none;');
                },
                init: function () {
                    var section = this;

                    section.selectedLayoutHolder.on('click', '.ui-draggable', function() {
                        if($(this).find('img').hasClass('draggable_image')){
                            section.onImageClick($(this));
                        }else{
                            section.onTextClick($(this));
                        }
                    });

                    section.selectedLayoutHolder.on('mouseover', '.ui-draggable', function() {
                        $('div.target-holder').css("background", "none");
                    });

                }
            },
            toolOptions: {
                draggableCounter: 1,
                btnMainColour: $("#main-colour"),
                btnSecondColor: $("#second-colour"),
                btnThirdColor: $("#third-colour"),
                btnAddText: $("#frm-text-add button#add-draggable"),
                btnEditText: $("#frm-text-add button#edit-draggable"),
                btnDeleteText: $("#frm-text-add button#delete-draggable"),
                btnAddNewText: $("#frm-text-add #add-new-text"),
                txtToAdd: $("#frm-text-add #inputTextToAdd"),
                fontToAdd: $("#frm-text-add #selectFontToAdd"),
                fontSizeToAdd: $("#frm-text-add #selectFontSizeToAdd"),
                textColourToAdd: $("#frm-text-add #text-colour"),
                inputColourPallette: $(".sp-input-container .sp-input"),
                inputColourPallettePreview: $(".sp-preview-inner"),
                btnAddImage: $("button#add-draggable-image"),
                btnSelectImage: $("div.hero-unit"),
                btnDeleteImage: $("button#delete-draggable-image"),
                btnAddNewImage: $("button#add-new-draggable-image"),
                sectionNewTextInfo: $("section#text-info-text"),
                sectionEditTextInfo: $("section#text-info-edit-text"),
                sectionNewImageInfo: $("section#image-info-text"),
                sectionEditImageInfo: $("section#image-info-edit-text"),


                resetColours: function (){
                    this.btnMainColour.attr("style", "");
                    this.btnSecondColor.attr("style", "");
                    this.btnThirdColor.attr("style", "");
                },
                onClickAddText: function(){
                    if(designerTool.sections.toolOptions.txtToAdd.val().replace(/\s/g,'')!=""){
                        var cssText =
                            'color: '+designerTool.sections.toolOptions.textColourToAdd.val()+
                            ';font-family: '+designerTool.sections.toolOptions.fontToAdd.val()+
                            ';font-size: '+designerTool.sections.toolOptions.fontSizeToAdd.val()+ "px" +
                            ';cursor: pointer'+
                            ';background: none'+
                            ';top: 0'+
                            ';background-color: #E8E8E8'+
                                //';width: 50px'+
                            ';position: absolute;';

                        designerTool.sections.toolOptions.draggableCounter += 1;

                        /*var draggable_id = "draggable_" + designerTool.sections.toolOptions.draggableCounter;
                         $("#selected-layout-holder").append(
                         '<div id="'+draggable_id+'" class="ui-widget-content" style="'+cssText+'">' + designerTool.sections.toolOptions.txtToAdd.val() + '</div>'
                         );
                         $( "#"+ draggable_id).draggable(
                         {
                         revert: "invalid",
                         start: function() {
                         $(this).height($(this).height()).width($(this).width());   //drag dimensions
                         },
                         stop: function() {
                         $(this).height($(this).height()).width($(this).width());     //original icon size
                         }
                         }
                         );*/


                        var draggable_id = "draggable_" + designerTool.sections.toolOptions.draggableCounter;
                        var target_id = "target_" + designerTool.sections.toolOptions.draggableCounter;
                        var textS = '' +
                            designerTool.sections.toolOptions.txtToAdd.val();

                        $("#selected-layout-holder").append(
                            '<div id="'+draggable_id+'" class="ui-draggable" style="top: 0; position: absolute;">' +
                            '<div id="'+target_id+'"  style="'+cssText+'" class="target-holder">' +
                            textS +
                            '</div>' +
                            '</div>'
                        );

                        $('#' + target_id).rotatable();
                        $('#' + draggable_id).draggable();

                        // hide handles
                        $('div.ui-rotatable-handle, div.ui-resizable-handle').addClass('hide-handles');

                    }else{
                        alert("Text field cannot be empty");
                    }
                    designerTool.sections.toolOptions.txtToAdd.val('');
                    designerTool.sections.toolOptions.btnAddText.removeClass('dead');
                    designerTool.sections.toolOptions.btnEditText.addClass('dead');
                    designerTool.sections.toolOptions.btnDeleteText.addClass('dead');
                    designerTool.sections.toolOptions.btnAddNewText.addClass('dead');
                    $('.ui-draggable').removeClass('selected_text');


                },
                onClickUpdateText: function(){
                    var selected_id = $('.selected_text').attr('id');
                    var selected_id_style = $('.selected_text').attr('style');

                    // remove existing
                    $("#"+selected_id).remove();

                    if(designerTool.sections.toolOptions.txtToAdd.val().replace(/\s/g,'')!=""){
                        var cssText =
                            'color: '+designerTool.sections.toolOptions.textColourToAdd.val()+
                            ';font-family: '+designerTool.sections.toolOptions.fontToAdd.val()+
                            ';font-size: '+designerTool.sections.toolOptions.fontSizeToAdd.val()+ "px" +
                            ';cursor: pointer'+
                            ';background: none'+
                            ';top: 0'+
                                //';height: 50px'+
                                //';width: 50px'+
                            ';position: absolute;';

                        designerTool.sections.toolOptions.draggableCounter += 1;

                        /*var draggable_id = "draggable_" + designerTool.sections.toolOptions.draggableCounter;
                         $("#selected-layout-holder").append(
                         '<div id="'+draggable_id+'" class="ui-widget-content" style="'+cssText+'">' + designerTool.sections.toolOptions.txtToAdd.val() + '</div>'
                         );
                         $( "#"+ draggable_id).draggable(
                         {
                         revert: "invalid",
                         start: function() {
                         $(this).height($(this).height()).width($(this).width());   //drag dimensions
                         },
                         stop: function() {
                         $(this).height($(this).height()).width($(this).width());     //original icon size
                         }
                         }
                         );*/


                        var draggable_id = "draggable_" + designerTool.sections.toolOptions.draggableCounter;
                        var target_id = "target_" + designerTool.sections.toolOptions.draggableCounter;
                        var textS = '' +
                            designerTool.sections.toolOptions.txtToAdd.val();

                        $("#selected-layout-holder").append(
                            '<div id="'+draggable_id+'" class="ui-draggable" style="'+selected_id_style+'">' +
                            '<div id="'+target_id+'"  style="'+cssText+'" class="target-holder">' +
                            textS +
                            '</div>' +
                            '</div>'
                        );

                        $('#' + target_id).rotatable();
                        $('#' + draggable_id).draggable();
                        // hide handles
                        $('div.ui-rotatable-handle, div.ui-resizable-handle').addClass('hide-handles');


                    }else{
                        alert("Text field cannot be empty");
                    }
                    designerTool.sections.toolOptions.txtToAdd.val('');
                    designerTool.sections.toolOptions.btnAddText.removeClass('dead');
                    designerTool.sections.toolOptions.btnEditText.addClass('dead');
                    designerTool.sections.toolOptions.btnDeleteText.addClass('dead');
                    designerTool.sections.toolOptions.btnAddNewText.addClass('dead');
                    $('.ui-draggable').removeClass('selected_text');

                    // get selected-text id first
                    /*var arr = selected_id.split('_');
                     console.log(arr);
                     var target_id = "target_" + arr[1];
                     if(designerTool.sections.toolOptions.txtToAdd.val().replace(/\s/g,'')!=""){
                     $('#' + target_id).css({
                     "color": designerTool.sections.toolOptions.textColourToAdd.val(),
                     "font-family": designerTool.sections.toolOptions.fontToAdd.val()
                     });
                     $('#' + target_id).html(designerTool.sections.toolOptions.txtToAdd.val()+'<div class="ui-rotatable-handle ui-draggable"></div>');
                     $('#' + selected_id).removeClass('selected_text');
                     }else{
                     alert("Text field cannot be empty");
                     }
                     designerTool.sections.toolOptions.txtToAdd.val('');
                     designerTool.sections.toolOptions.btnAddText.removeClass('dead');
                     designerTool.sections.toolOptions.btnEditText.addClass('dead');
                     designerTool.sections.toolOptions.btnDeleteText.addClass('dead');
                     designerTool.sections.toolOptions.btnAddNewText.addClass('dead');*/

                    //$('#' + target_id).rotatable();
                    //$('#' + draggable_id).draggable();

                },
                onClickDeleteText: function(){
                    // get selected-text id first
                    var selected_id = $('.selected_text').attr('id');
                    $('#' + selected_id).remove();
                    designerTool.sections.toolOptions.txtToAdd.val('');
                    designerTool.sections.toolOptions.btnAddText.removeClass('dead');
                    designerTool.sections.toolOptions.btnEditText.addClass('dead');
                    designerTool.sections.toolOptions.btnDeleteText.addClass('dead');
                    designerTool.sections.toolOptions.btnAddNewText.addClass('dead');
                    designerTool.sections.toolOptions.sectionNewTextInfo.removeClass('dead');
                    designerTool.sections.toolOptions.sectionEditTextInfo.addClass('dead');
                    // hide handles
                    $('div.ui-rotatable-handle, div.ui-resizable-handle').addClass('hide-handles');
                },
                showEditTextTab: function(txt_block_to_edit){
                    console.log('i m in showEditTextTab');
                    designerTool.sections.toolOptions.btnAddText.addClass('dead');
                    designerTool.sections.toolOptions.btnEditText.removeClass('dead');
                    designerTool.sections.toolOptions.btnDeleteText.removeClass('dead');
                    designerTool.sections.toolOptions.btnAddNewText.removeClass('dead');


                    // set values back
                    designerTool.sections.toolOptions.txtToAdd.val(txt_block_to_edit.text());
                    designerTool.sections.toolOptions.inputColourPallette.val($(txt_block_to_edit).css("color"));
                    designerTool.sections.toolOptions.inputColourPallettePreview.val($(txt_block_to_edit).css("color"));
                    designerTool.sections.toolOptions.fontToAdd.val($(txt_block_to_edit).css("font-family"));

                    designerTool.sections.toolOptions.sectionNewTextInfo.addClass('dead');
                    designerTool.sections.toolOptions.sectionEditTextInfo.removeClass('dead');

                },
                resetTextOptions: function(){
                    designerTool.sections.toolOptions.txtToAdd.val('');
                    designerTool.sections.toolOptions.btnAddText.removeClass('dead');
                    designerTool.sections.toolOptions.btnEditText.addClass('dead');
                    designerTool.sections.toolOptions.btnDeleteText.addClass('dead');
                    designerTool.sections.toolOptions.btnAddNewText.addClass('dead');
                    $('.ui-draggable').removeClass('selected_text');
                },
                onClickAddImage: function(){
                    //if(designerTool.sections.toolOptions.txtToAdd.val().replace(/\s/g,'')!=""){

                    if($("#editor img").attr('src') && $("#editor img").attr('src')!=''){
                        var cssText =
                            //'color: '+designerTool.sections.toolOptions.textColourToAdd.val()+
                            //';font-family: '+designerTool.sections.toolOptions.fontToAdd.val()+
                            'width: 200px'+
                            ';height:200px'+
                            ';padding: 20px'+
                            ';top: 0'+
                            ';position: absolute;';
                        designerTool.sections.toolOptions.draggableCounter += 1;
                        var draggable_id = "draggable_" + designerTool.sections.toolOptions.draggableCounter;
                        var target_id = "target_" + designerTool.sections.toolOptions.draggableCounter;
                        var imgS = '' +
                            '<img id="'+draggable_id+'_img" class="draggable_image" _moz_dirty="" src="'+$("#editor img").attr('src')+'" _moz_resizing="true" style="display: block; height: 100%; width: 100%;">';

                        $("#selected-layout-holder").append(
                            '<div id="'+draggable_id+'" class="ui-draggable" style="top: 0; position: absolute;">' +
                            '<div id="'+target_id+'"  style="'+cssText+'">' +
                            imgS +
                            '</div>' +
                            '</div>'
                        );

                        $('#' + target_id).resizable().rotatable();
                        $('#' + draggable_id).draggable();

                        // hide handles
                        $('div.ui-rotatable-handle, div.ui-resizable-handle').addClass('hide-handles');

                        // Clear current image from Editor
                        $("#editor").text('');
                    }
                    else{
                        alert('Please select an image first');
                    }


                },
                showEditImageTab: function(txt_block_to_edit){
                    designerTool.sections.toolOptions.btnAddImage.addClass('dead');
                    designerTool.sections.toolOptions.btnSelectImage.addClass('dead');
                    designerTool.sections.toolOptions.btnDeleteImage.removeClass('dead');
                    designerTool.sections.toolOptions.btnAddNewImage.removeClass('dead');
                    designerTool.sections.toolOptions.sectionNewImageInfo.addClass('dead');
                    designerTool.sections.toolOptions.sectionEditImageInfo.removeClass('dead');
                },
                onClickDeleteImage: function(){
                    // get selected-image id first
                    var selected_id = $('.selected_image').attr('id');
                    $('#' + selected_id).remove();
                    designerTool.sections.toolOptions.btnAddImage.removeClass('dead');
                    designerTool.sections.toolOptions.btnSelectImage.removeClass('dead');
                    designerTool.sections.toolOptions.btnDeleteImage.addClass('dead');
                    designerTool.sections.toolOptions.btnAddNewImage.addClass('dead');
                    designerTool.sections.toolOptions.sectionNewImageInfo.removeClass('dead');
                    designerTool.sections.toolOptions.sectionEditImageInfo.addClass('dead');

                    // hide handles
                    $('div.ui-rotatable-handle, div.ui-resizable-handle').addClass('hide-handles');
                },
                onClickAddNewImage: function(){
                    designerTool.sections.toolOptions.btnAddImage.removeClass('dead');
                    designerTool.sections.toolOptions.btnSelectImage.removeClass('dead');
                    designerTool.sections.toolOptions.btnDeleteImage.addClass('dead');
                    designerTool.sections.toolOptions.btnAddNewImage.addClass('dead');
                },
                init: function () {
                    this.btnAddText.click(this.onClickAddText);
                    this.btnEditText.click(this.onClickUpdateText);
                    this.btnDeleteText.click(this.onClickDeleteText);
                    this.btnAddNewText.click(this.onClickAddText);
                    this.btnAddImage.click(this.onClickAddImage);
                    this.btnDeleteImage.click(this.onClickDeleteImage);
                    this.btnAddNewImage.click(this.onClickAddNewImage);
                }
            },
            imagesScroller: {
                designList: $('#design-list'),
                selectedThumbnail: $('ul.mTSContainer li a.image-set-thumbnail'),
                onThumbnailClick: function () {

                    var thumbnail = $(this);
                    //designerTool.sections.selectedSVG.objSvg.attr('data', 'resources/svgs/image-set-' + thumbnail.attr('data-image-set-id') + '.svg');
                    var svgPath = 'resources/svgs/image-set-' + thumbnail.attr('data-image-set-id') + '.svg';
                    designerTool.sections.selectedSVG.selectedLayoutHolder.load(svgPath);
                    designerTool.sections.toolOptions.resetColours();
                    designerTool.sections.imagesScroller.selectedThumbnail.removeClass('selected-thumbnail');
                    thumbnail.addClass('selected-thumbnail');
                },

                init: function () {
                    this.selectedThumbnail.click(this.onThumbnailClick);

                    // Load first SVG by default
                    designerTool.sections.selectedSVG.selectedLayoutHolder.load('resources/svgs/image-set-1.svg');
                }
            },
            designForm: {
                detailsForm: $('form#right-column-details-form'),
                fullname: $('input#fullname'),
                emailaddress: $('input#emailaddress'),
                notes: $('textarea#notes'),
                submitDetails: $('#submit-details'),
                resetDetails: $('#reset-details'),


                onFormSubmit: function(){
                    $("#form-design").validate({
                        submitHandler: function(form) {
                            designerTool.sections.designForm.submitDetails.text('Please wait...');

                            // hide all resize handles
                            $('div.ui-rotatable-handle, div.ui-resizable-handle').addClass('hide-handles');
                            designerTool.sections.request.saveDesign();
                        }

                    });
                },
                getRequestTypes: function(){
                    var values = [];
                    $.each($("input[name='request_types[]']:checked"), function() {
                        values.push($(this).val());
                    });
                    return values.join(', ');
                },
                resetForm: function (){
                    this.resetDetails.trigger('click');
                    designerTool.sections.designForm.submitDetails.text('Submit your design');
                    designerTool.sections.selectedSVG.selectedLayoutHolder.load('resources/svgs/image-set-1.svg');
                },
                init: function () {
                    var section = this;
                    section.submitDetails.click(function(event){
                        section.onFormSubmit();
                    });
                }
            },
            request:{
                saveDesign: function(){

                    $.post(
                        web_url+"designer/savedoc",
                        {
                            request_types: designerTool.sections.designForm.getRequestTypes(),
                            firstname: $('#firstname').val(),
                            lastname: $('#lastname').val(),
                            emailaddress: $('#emailaddress').val(),
                            telephone: $('#telephone').val(),
                            mobile: $('#mobile').val(),
                            youraddress: $('#youraddress').val(),
                            notes: $('#notes').val(),
                            final_design: $('#selected-layout-holder-left').html()
                        }
                    )

                        .done(function(result) {
                            if(result) {
                                designerTool.sections.designForm.resetForm();
                                alert('Submitted successfully');

                            }
                            else
                                alert('Submission failed');
                        })


                },
                init: function () {

                }
            },
            // Use Section below to Initialise any 3rd party APIs or define any general utility functions
            general: {
                scrollToElement: function (element, topOffset) {
                    var el = $(element);
                    if (el.length) {
                        topOffset = parseInt(topOffset, 10) || 0;
                        var offset = $(element).offset();
                        offset.top += topOffset;
                        if (offset) {
                            $('html,body').stop().animate({scrollTop: offset.top}, 600);
                        }
                    } else {
                        Console.info("Element doesn't exist");
                    }
                },
                init: function () {


                    // Initialize Tool Tabs
                    $('#myTabs a').click(function (e) {
                        e.preventDefault();
                        $(this).tab('show');
                    });


                    // Initialize droppable section
                    $( "#selected-layout-holder" ).droppable({
                        activeClass: "ui-state-default",
                        hoverClass: "ui-state-hover",
                        drop: function( event, ui ) {
                            $( this )
                                .addClass( "ui-state-highlight" )
                                .find( "p" )
                                .html( "Dropped!" );
                        }
                    });

                    //$( "#draggable_99").draggable({ revert: "invalid" });
                    //$( "#draggable_99_img" ).resizable();

                    // Main Colour Pallette
                    $("#main-colour").spectrum({
                        color: "#ECC",
                        showInput: true,
                        className: "full-spectrum",
                        showInitial: true,
                        showPalette: true,
                        showSelectionPalette: true,
                        maxSelectionSize: 10,
                        preferredFormat: "hex",
                        localStorageKey: "spectrum.demo",
                        move: function (color) {

                        },
                        show: function () {

                        },
                        beforeShow: function () {

                        },
                        hide: function () {

                        },
                        change: function(colour) {
                            console.log("main colour is "+colour);
                            $("#main-colour").attr('style', 'background-color: '+ colour +'; color: #fff');
                            $(".main-colour").css({"fill": colour});

                        },
                        palette: [
                            ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
                                "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
                            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
                                "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
                            ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
                                "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
                                "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
                                "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
                                "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
                                "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
                                "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
                                "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
                                "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
                                "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
                        ]
                    });


                    // Second Colour Pallette
                    $("#second-colour").spectrum({
                        color: "#ECC",
                        showInput: true,
                        className: "full-spectrum",
                        showInitial: true,
                        showPalette: true,
                        showSelectionPalette: true,
                        maxSelectionSize: 10,
                        preferredFormat: "hex",
                        localStorageKey: "spectrum.demo",
                        move: function (color) {

                        },
                        show: function () {

                        },
                        beforeShow: function () {

                        },
                        hide: function () {

                        },
                        change: function(colour) {
                            $("#second-colour").attr('style', 'background-color: '+ colour +'; color: #fff');
                            $(".second-colour").css({"fill": colour});

                        },
                        palette: [
                            ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
                                "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
                            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
                                "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
                            ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
                                "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
                                "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
                                "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
                                "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
                                "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
                                "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
                                "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
                                "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
                                "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
                        ]
                    });


                    // Third Colour Pallette
                    $("#third-colour").spectrum({
                        color: "#ECC",
                        showInput: true,
                        className: "full-spectrum",
                        showInitial: true,
                        showPalette: true,
                        showSelectionPalette: true,
                        maxSelectionSize: 10,
                        preferredFormat: "hex",
                        localStorageKey: "spectrum.demo",
                        move: function (color) {

                        },
                        show: function () {

                        },
                        beforeShow: function () {

                        },
                        hide: function () {

                        },
                        change: function(colour) {
                            $("#third-colour").attr('style', 'background-color: '+ colour +'; color: #fff');
                            $(".third-colour").css({"fill": colour});
                            $(".third-colour-stroke").css({"stroke": colour});

                        },
                        palette: [
                            ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
                                "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
                            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
                                "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
                            ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
                                "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
                                "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
                                "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
                                "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
                                "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
                                "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
                                "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
                                "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
                                "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
                        ]
                    });


                    // Text Colour Pallette
                    $("#text-colour").spectrum({
                        color: "#000",
                        showInput: true,
                        className: "full-spectrum",
                        showInitial: true,
                        showPalette: true,
                        showSelectionPalette: true,
                        maxSelectionSize: 10,
                        preferredFormat: "hex",
                        localStorageKey: "spectrum.demo",
                        move: function (color) {

                        },
                        show: function () {

                        },
                        beforeShow: function () {

                        },
                        hide: function () {

                        },
                        change: function(colour) {

                        },
                        palette: [
                            ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
                                "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
                            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
                                "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
                            ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
                                "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
                                "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
                                "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
                                "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
                                "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
                                "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
                                "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
                                "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
                                "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
                        ]
                    });

                    $('.btn-toolbar input').attr('style', 'display: block; opacity: 100; position:relative;');



                }
            }
        },
        init: function () {
            $.each(this.sections, function (k, v) {
                if (v && 'object' == typeof v && 'function' == typeof v.init) {
                    v.init();
                }
            });
        }
    };
    designerTool.init();
});
