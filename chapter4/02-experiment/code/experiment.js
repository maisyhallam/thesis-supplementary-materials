/******************************************************************************/
/*** Initialise jspsych *******************************************************/
/******************************************************************************/


var jsPsych = initJsPsych({
    show_progress_bar: true,
    on_finish: function () {
      window.location = "https://app.prolific.com/submissions/complete?cc=CQ4WUFGC";
    },
  });

/******************************************************************************/
/*** Housekeeping *************************************************************/
/******************************************************************************/

var participant_id = jsPsych.data.getURLVariable('PROLIFIC_PID')

var random_id = jsPsych.randomization.randomID(10)

var COMPLETION_CODE = "CQ4WUFGC"

// what order of presentation is the tree in?
var condition = jsPsych.randomization.sampleWithoutReplacement(['mfgb','fmgb','fmbg','mfbg'],1)[0]

// NOTE: DATA WILL NOT SAVE IF YOU RUN THIS EXPERIMENT LOCALLY
// ALL FILES MUST BE RUN FROM A SERVER TO GET DATA TO SAVE
function save_data(name, data_in) {
  var url = "save_data.php";
  var data_to_send = { filename: name, filedata: data_in };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data_to_send),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
}

function save_data_line(data) {
  // choose the data we want to save - this will also determine the order of the columns
  var data_to_save = [
    participant_id,
    random_id,
    condition,
    data.feature1,
    data.feature2,
    data.exemplar,
    data.target1,
    data.target2,
    data.exemplar_label,
    data.target1_choice,
    data.target2_choice,
    data.chosen_target,
    data.correct,
    data.chosen_feature,
    data.trial_index,
    data.time_elapsed,
    data.rt,
  ];
  // join these with commas and add a newline
  var line = data_to_save.join(",") + "\n";
  save_data("nifty-fig-data/" + participant_id + ".csv", line);
}


function save_survey(data) {
  // choose the data we want to save - this will also determine the order of the columns
  var data_to_save = [
    participant_id,
    random_id,
    condition,
    data.response['strategy'],
    data.response['feedback']
  ];
  // join these with commas and add a newline
  var line = data_to_save.join(",") + "\n";
  save_data("nifty-fig-data/surveys/" + participant_id + "_survey.csv", line);
}

 /******************************************************************************/
/***  Stimuli *******************************************************/
/******************************************************************************/

// list of shorthand codes, ordered by tree position
if(condition === 'mfgb'){
  var relatives = ['mm','mf','fm','ff','mz','mb','m','f','fz','fb','mzd','mzs','mbd','mbs','z','b','fzd','fzs','fbd','fbs','zd','zs','d','s','bd','bs','dd','ds','sd','ss']}
else if(condition === 'fmgb'){
  var relatives = ['fm','ff','mm','mf','fz','fb','f','m','mz','mb','fzd','fzs','fbd','fbs','z','b','mzd','mzs','mbd','mbs','zd','zs','d','s','bd','bs','dd','ds','sd','ss']}
else if (condition === 'fmbg'){
  var relatives = ['ff','fm','mf','mm','fb','fz','f','m','mb','mz','fbs','fbd','fzs','fzd','b','z','mbs','mbd','mzs','mzd','bs','bd','s','d','zs','zd','ss','sd','ds','dd']}
else if(condition ==='mfbg') {
  var relatives = ['mf','mm','ff','fm','mb','mz','m','f','fb','fz','mbs','mbd','mzs','mzd','b','z','fbs','fbd','fzs','fzd','bs','bd','s','d','zs','zd','ss','sd','ds','dd']}


var positions = [[357,40],[476,40],[919,40],[1038,40],
[99,166],[319,166],[641,166],[764,166],[1089,166],[1304,166],
[49,300],[149,300],[268,300],[370,300],[467,300],[927,300],[1040,300],[1141,300],[1250,300],[1352,300],
[385,434],[515,434],[629,434],[770,434],[880,434],[1014,434],
[555,559],[646,559],[740,559],[830,559]]

let coordinates = {}
for(var r in relatives){
  coordinates[relatives[r]] = positions[r]
}

var feature_pairs = {
  'gend-gcr': [['fz','mm','ff'],['fb','mf','fm'],['fz','mz','fb'],['fb','mb','fz'],['mb','ff','mm'],['mz','fm','mf'],['fzd','mzd','fzs'],['fbd','mzd','fbs'],
  ['fzs','mzs','fzd'],['fbs','mzs','fbd'],['zd','bd','zs'],['bd','zd','bs'],['sd','dd','ss'],['ss','ds','sd']],

  'gend-line': [['mz','mm','mzs'],['mz','mm','mbs'],['mbd','mm','mb'],['mzs','mf','mz'],['mz','mzd','mf'],['mz','mm','ds'],['mb','mf','mbd'],
  ['zs','mf','zd'],['mb','mf','zd'],['fz','fm','fzs'],['bd','fm','fzs'],['fz','fm','fbs'],['bd','fm','fbs'],['fz','fm','bs'],['fb','ff','fzd'],['fb','ff','fbd'],
  ['fb','ff','bd'],['mm','mz','ds'],['mf','mb','dd'],['fm','fz','ss'],['ff','fb','sd'],['mm','mzd','ds'],['mf','mzs','dd'],['mm','mbd','ds'],['mf','mbs','dd'],
  ['fm','fzd','ss'],['ff','fzs','sd'],['fm','fbd','ss'],['ff','fbs','sd'],['fm','bd','ss'],['ff','bs','sd']],

  'gene-gend': [['mz','mb','mzd'],['ff','fm','f'],['ds','dd','mf'],['dd','ds','mm'],['sd','ss','fm'],['ss','sd','ff'],['zd','zs','mz'],['zs','zd','mb'],['mzd','mbs','mz'],
  ['mbd','mbs','mz'],['mbs','mbd','mb'],['mzs','mbd','mb'],['mzd','mzs','mz'],['mbd','mzs','mz'],['mbs','mzd','mb'],['mzs','mzd','mb'],['mm','mf','m'],['fbd','fbs','fz'],
  ['fzd','fbs','fz'],['fzd','fbs','fz'],['fzs','fzd','fb'],['fzs','fbd','fb'],['fbs','fbd','fb'],['zd','zs','mzd'],['zd','zs','mbd'],['zs','zd','mbs'], ['zs','zd','mzs'],
  ['bd','bs','fzd'],['bd','bs','fbd'], ['bs','bd','fzs'], ['bs','bd','fbs']],

  'gene-line': [['s','bs','ds'],['z','fzd','mm'],['z','fbd','mm'],['b','mbs','ff'],['b','mzs','ff'],['d','bd','mm'],['d','zd','fm'],['z','mzd','fm'],
  ['z','mbd','fm'],['b','fbs','mf'],['b','mzs','ff'],['s','bs','mf'],['s','zs','ff'],['z','fzd','dd'],['z','fbd','dd'],['b','mbs','ss'],['b','mzs','ss'],['d','bd','dd'],
  ['d','zd','sd'],['z','mzd','sd'],['z','mbd','sd'],['b','fbs','ds'],['b','fzs','ds'],['s','zs','ss']],

  'gene-gcr': [['fm','mm','sd'],['ff','mf','ss'],['mm','fm','dd'],['mf','ff','ds'],['fz','mz','fzd'],['fz','mz','fbd'],['dd','sd','mm'],['ds','ss','mf'],['sd','dd','fm'],
  ['ss','ds','ff'],['fz','mz','bd'],['mzd','fbd','mz'],['fb','mb','fzs'],['mbs','fzs','mb'],['fb','mb','fbs'],['mbs','fbs','mb'],['fb','mb','bs'],['zs','bs','mb'],
  ['mz','fz','mzd'],['mz','fz','mbd'],['mz','fz','zd'],['mb','fb','mzs'],['mb','fb','mzs'],['mb','fb','mzs'],['mb','fb','mbs'],['mb','fb','zs'],['zd','bd','mzd'],
  ['zs','bs','mzs'],['zd','bd','mbd'],['bd','zd','fzd'],['bs','zd','fzs'],['bs','zs','fbs'],['fbd','mbd','bd'],['fzd','mbd','bd'],['fbs','mzs','bs'],['fzs','mzs','bs'],
  ['mbd','fzd','zd'],['mzd','fzd','zd'],['mbs','fzs','zs'],['mzs','fzs','zs'],['mbd','fbd','zd'],['mbs','fbs','zs'],['mzs','fbs','zs']],

  'line-gcr': [['mbd','fz','mm'],['mz','fzd','mm'],['mz','fbd','mm'],['mz','bd','mm'],['mbs','fb','mf'],['mzs','fb','mf'],['mb','fzs','mf'],
  ['mb','fbs','mf'],['ss','mf','bs'],['sd','mm','fz'],['ss','mf','fb'],['fbd','mz','fm'],['fzd','mz','fm'],['fz','mzd','fm'],['dd','fm','mzd'],['fz','mbd','dd'],
  ['fz','zd','fm'],['dd','fm','zd'],['ds','ff','mb'],['fbs','mb','ff'],['fzs','mb','ff'],['ds','ff','mzs'],['fb','mzs','ff'],['ds','ff','mbs'],['fb','mbs','ff'],
  ['ds','ff','zs'],['fb','zs','ff'],['fzd','mz','sd'],['fbd','mz','sd'],['mm','sd','mz'],['fzs','mb','ss'],['fbs','mb','ss'],['fbs','mb','ss'],['mf','mb','ss'],
  ['fm','dd','fz'],['ff','ds','fb'],['mm','sd','mzd'],['mf','ss','mzs'],['mm','sd','mbd'],['mf','ss','mbs'],['fm','dd','fzd'],['ff','ds','fzs'],['fm','dd','fbd'],
  ['ff','ds','fbs'],['fm','dd','bd'],['mbd','bd','dd'],['mzd','bd','dd'],['ff','ds','bs'],['mbs','bs','ds'],['mzs','bs','ds'],['mm','sd','zd'],['fbd','zd','sd'],
  ['fzd','zd','sd'],['mf','ss','zs'],['fbs','zs','ss'],['fzs','zs','ss']]

}



var images_to_preload = []

var image_names = ['children','cousins','gparents','niblings','nuncles','parents','siblings','you', 'whole-tree']
// var image_names = ['whole-tree']

for(var i of image_names){
  images_to_preload.push('images/' + condition + '/' + i + '.png')
}

var preload = {
  type: jsPsychPreload,
  images: images_to_preload
};

// an object that tells us what relatives correspond to which shorthand codes
var shorthand = {
"mz": "mother's sister",
"mb": "mother's brother",
"m": "mother",
"f": "father",
"fz": "father's sister",
"fb": "father's brother",
"mzd": "mother's sister's daughter",
"mzs": "mother's sister's son",
'mbd': "mother's brother's daughter",
"mbs": "mother's brother's son",
'z': "sister",
'b': "brother",
'fzd': "father's sister's daughter",
"fzs": "father's sister's brother",
'fbd': "father's brother's daughter",
"fbs": "father's brother's son",
"mm": "mother's mother",
"mf": "mother's father",
"fm": "father's mother",
"ff": "father's father",
"zd": "sister's daughter",
"zs": "sister's son",
"bd": "brother's daughter",
"bs": "brother's son",
"d": "daughter",
"s": "son",
"dd": "daughter's daughter",
"ds": "daughter's son",
"sd": "son's daughter",
"ss": "son's son"}

var label_choices = jsPsych.randomization.shuffle([['kïmy', 'qïru'],['kawuka',  'goviku'],['øqoç', 'aweh'],['etupol','awupav'],['kvurdå', 'rymsvå'],['šïenö', 'cöhido']])

// global variable to set the height and width of the tree images
var img_width = 1400
var img_height = 600

// empty kinship system object to be populated as participants do the experiment
ks = {}


/******************************************************************************/
/***  Functions *******************************************************/
/******************************************************************************/

// create an image object on the canvas
function make_image_object(image){
    var image_object = new Image()
    image_object.src = 'images/' + condition + '/' + image + '.png'
return image_object
}

// check if object overlaps snapping boundary box
function overlapping(obj,target) {
    return(
        obj.left < (target.left + target.width) &&
        (obj.left + target.width) > target.left &&
        obj.top < (target.top + target.height) &&
        (obj.top + (target.height * 0.25)) > target.top
        );
}

function in_place(obj,oth,target){
    if(obj.left === target.x && obj.top === target.y){
      return true
    } else if (oth.left === target.x && oth.top === target.y){
      return true
    }
    else {return false}}

function snap(obj,target) {
    obj.set({
        left: target.x,
        top: target.y
    });
    obj.setCoords();
}

/******************************************************************************/
/*** Create canvas *******************************************************/
/******************************************************************************/



function build_stimulus(c,labels,initial_referent,targets,boxes = false, categorisation = false){

    // create canvas
    var canvas = new fabric.Canvas(c)

    // prevent multiselecting/grouping the two labels
    canvas.selection = false

    // create image object for the background tree
    image_object = make_image_object('whole-tree')

    // add background tree to canvas
    var img = new fabric.Image(image_object, {
      evented: false,
      left:  (canvas.width * 0.5) - (img_width * 0.5),
      top: (canvas.height * 0.5) - (img_height * 0.5)
    });

    img.scaleToHeight(img_height);
    img.scaleToWidth(img_width);

    canvas.add(img);

    // lower opacity of any relative who is not one of the targets for this trial

    var target_coordinates = {}

    for(var referent of Object.keys(coordinates)){
      if(referent != initial_referent){

        // coordinates for the opaque boxes
        var opaque_coords = {x: img.left + (coordinates[referent][0] ) - 40, // minus half the width of the rect itself
        y: img.top + (coordinates[referent][1]) - 40 } // minus half the height of the rect itself

        var opaque_rect = new fabric.Rect({
          left: opaque_coords.x,
          top: opaque_coords.y,
          fill: 'white',
          opacity: 0.7,
          width: 80,
          height: 85,
          // stroke: 'black',
          // remove all interactions
          evented: false
        });

        if(referent === targets[0] | referent === targets[1]){
          target_coordinates[referent] = opaque_rect

        }

        canvas.add(opaque_rect)
    }}

    // add label to the known member of the category (initial_referent)

    const given_label = new fabric.Text(labels[0], {
        textAlign: 'center',
        borderColor: 'black',
        padding: 2,
        fontFamily: 'Open Sans',
        fontSize: 18,
        fontWeight: 'bold',
        evented: false

      })

    given_label.set({
        left:  img.left + coordinates[initial_referent][0] - (given_label.width * 0.5),
        top: img.top + coordinates[initial_referent][1] + 40
    });

    // add border to initial_referent

    var initial_border = new fabric.Rect({
      left: (img.left + coordinates[initial_referent][0]) - 40,
      top: (img.top + (coordinates[initial_referent][1])) - 40,
      fill: '',
      width: 80,
      height: 80,
      stroke: '#FFC300',
      strokeWidth:3,
      evented:false
    })

    canvas.add(initial_border,given_label)

    if(boxes) {
        // add border rectangles around target referents
    // and an invisible rectangle for text to snap to
    var snapping_rectangles = []



    for (var referent of targets) { // referent index 0 or referent 1

    canvas.remove(target_coordinates[referent]) // remove opaque boxes from targets

    // coordinates for the selection rectangles
    select = {x: img.left + (coordinates[referent][0] ) - 40, // minus half the width of the rect itself
              y: img.top + (coordinates[referent][1]) - 40 } // minus half the height of the rect itself

    // create a rectangle object
    var border_rect = new fabric.Rect({
      left: select.x,
      top: select.y,
      fill: '', // no fill
      width: 80,
      height: 80,
      stroke: '#C70039', // red border
      strokeWidth: 3,
      // remove all interactions
      evented: false
    });

    // create the snap-to-boundary box - labels entering this space will snap to a space beneath the referent
    var snap_rect = new fabric.Rect({
      left: select.x - 10,
      top: select.y - 10,
      fill: '', // no fill
      // stroke: 'black',
      width: 100,
      height: 100, // snapping box is slightly larger than the border box
      // set all functions to false
      evented: false
    });

    // add rectangle onto canvas
    canvas.add(border_rect,snap_rect);

    snapping_rectangles.push(snap_rect)
    };
    }

    if(categorisation){
    // add moving labels

    text_offset = 20 //-150 // how far should the labels be offset from the centre point?

    var text_objects = []
    // var text_initial_pos = []

    var shuffled_labels = jsPsych.randomization.shuffle(labels)

    for (var label of shuffled_labels){
      const label_text = new fabric.Text(label, {
        textAlign: 'center',
        borderColor: 'black',
        padding: 2,
        fontFamily: 'Open Sans',
        fontSize: 18,
        fontWeight: 'bold',
      })

      // Create a rectangle slightly larger than the text
      const textbox = new fabric.Rect({
        left: label_text.left - ((100 - label_text.width) / 2 ), // set text in middle of box
        top: label_text.top - 3,
        width: 100,
        height: 25,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 2,
        selectable: false,
      });

      // Group text with textbox
      const bordered_text = new fabric.Group([textbox, label_text])
      bordered_text.hasControls = false

    // set the position of the text based on the size of the canvas and the size of the text
      bordered_text.set({
        // left:  ((img_width / 2) - (bordered_text.width /2)) + text_offset,
        // top: ((img.height - 25) - (bordered_text.height / 2))
        left: ((canvas.width/2) - (bordered_text.width/2)),
        top: text_offset
      });

      canvas.add(bordered_text)
      text_objects.push(bordered_text)
      text_offset += 50 // increase the text offset for the second label
    }



    // when the label objects are moving, we want several things to happen:
    // 1. we want them to snap into place beneath the target referents
    // 2. we want them to swap places if they enter the same space
    // 3. we want the continue button to be enabled if both labels are placed beneath targets

    canvas.on('object:moving', function (e) {
      const obj = e.target;

      for(object of text_objects){
        if(object === obj){}
        else{var other_obj = object}
      }

      const obj_index = text_objects.indexOf(obj)
      const oth_index = text_objects.indexOf(other_obj)


      // snap coordinates for each target referent
      const target1 = {x: (snapping_rectangles[0].left + snapping_rectangles[0].width / 2 - obj.width / 2),
                 y: (snapping_rectangles[0].top + snapping_rectangles[0].height / 2 - obj.height / 2) + 60}
      const target2 = {x: (snapping_rectangles[1].left + snapping_rectangles[1].width / 2 - obj.width / 2),
                 y: (snapping_rectangles[1].top + snapping_rectangles[1].height / 2 - obj.height / 2) + 60}

    // snap label to target referent 1
      if (overlapping(obj, snapping_rectangles[0])) {
          snap(obj,target1)

        // if the other label was already in this position, move other label to target referent 2
          if(overlapping(obj,other_obj)){
            snap(other_obj,target2)
      }

      ks[targets[0]] = shuffled_labels[obj_index] // global variable telling us
      ks[targets[1]] = shuffled_labels[oth_index] // which referent was assigned which label
    }

    // snap label to target referent 2
      else if(overlapping(obj, snapping_rectangles[1])){

          snap(obj,target2)

          if(overlapping(obj,other_obj)){
            snap(other_obj,target1)
      }

      ks[targets[1]] = shuffled_labels[obj_index]
      ks[targets[0]] = shuffled_labels[oth_index]

      }

      if(in_place(obj,other_obj,target1) && in_place(obj,other_obj,target2)){ // if there are labels in both target positions
        console.log('all labels assigned!')
        document.querySelector('#jspsych-continue-btn').disabled = false; // allow participants to click continue
    } else{
      console.log('labels not assigned')
      document.querySelector('#jspsych-continue-btn').disabled = true; // don't allow participants to click continue
    }

    // prevent labels from leaving the canvas environment (what a stupid problem)
    obj.left = Math.max(0, Math.min(obj.left, canvas.width - obj.width));
    obj.top = Math.max(0, Math.min(obj.top, canvas.height - obj.height));

    obj.setCoords(); // Update coordinates

    }); // end of object:moving event


};

} // end of function


/******************************************************************************/
/*** Create trials  *******************************************************/
/******************************************************************************/

// the tree walkthrough trials should happen in a fixed order, so we can set them up with timeline variables.
var tree_tutorial_vars = [
  { image: 'images/' + condition + '/you.png', prompt: '<p style="font-size:20pt">During this study, try to image yourself at the centre of a family tree.'},
  { image: 'images/' + condition + '/parents.png', prompt: '<p style="font-size:20pt">These are your parents.'},
  { image: 'images/' + condition + '/siblings.png', prompt: '<p style="font-size:20pt">These are your siblings.'},
  { image: 'images/' + condition + '/gparents.png', prompt: '<p style="font-size:20pt">Here are your the parents of your parents.'},
  { image: 'images/' + condition + '/nuncles.png', prompt: "<p style='font-size:20pt'>And here are your parents' siblings."},
  { image: 'images/' + condition + '/cousins.png', prompt: "<p style='font-size:20pt'>Your parents' siblings have two children each."},
  { image: 'images/' + condition + '/children.png', prompt: "<p style='font-size:20pt'>You have your own children too!"},
  { image: 'images/' + condition + '/niblings.png', prompt: '<p style="font-size:20pt">And your siblings have two children each.'},
  { image: 'images/' + condition + '/whole-tree.png', prompt: '<p style="font-size:20pt">Finally, these are the children of your children.'},
  { image: 'images/' + condition + '/whole-tree.png', prompt: "<p style='font-size:20pt'>And that's everyone! Ready to begin?"}
]

// this function builds the tree walkthrough.
function tree_walkthrough(){

  var t0 = {
    type: jsPsychHtmlButtonResponse,
    choices: ['Next >'],
    stimulus: "<p style='font-size:20pt'> During this experiment, you will see a number of family trees. <br><br> Before we start, let's go through one.<br><br>",
    }

  var tutorial = {
    type: jsPsychImageButtonResponsePromptAboveButtons, // custom plugin to have prompt above buttons

    choices: ['Next >'],
    stimulus_height: img_height,
    stimulus_width: img_width,
    timeline_variables: tree_tutorial_vars,
    timeline: [
      {stimulus: jsPsych.timelineVariable('image'),
        prompt: jsPsych.timelineVariable('prompt')
      }
    ]
  }

  return [].concat(t0,tutorial)
  }

// this function builds the critical trials where participants categorise kin
function categorisation_trial(manip, labels, targets, initial_referent,attention=false){

  // if it's an attention check don't randomise the labels
  if(attention){
    var randomised_labels = labels
  }
  // if it is NOT an attention check, do randomise the labels
  else{var randomised_labels = jsPsych.randomization.shuffle(labels)}

  // create the trial timeline
  var trial = {
  type: jsPsychCanvasButtonResponsePromptabovestimulus, // custom plugin to have prompt at top
  canvas_size: [(img_height + 100),(img_width + 70)],
  timeline: [
  // first, the participants observes the label given to the exemplar
  {choices: ['null'],
    button_html: ['<button disabled class="jspsych-btn" style= "visibility: hidden">%choice%</button>'],
    trial_duration: 3500,
    // if an attention check, have a custom prompt, else use the normal prompt.
    prompt: function(){if(attention){var prompt = '<p style = "font-size: 20pt"> Are you paying attention? In English, you call this family member your <b>' + labels[0] + '</b>.'}
    else{var prompt = '<p style = "font-size: 20pt"> In this language, you call this family member your <b>' + randomised_labels[0] + '</b>.'
  }
return prompt
},
  stimulus: function(c){build_stimulus(c,randomised_labels,initial_referent,targets)},
  },
  // next, the participants see boxes appear around the targets
  {choices:['null'],
    button_html:  ['<button disabled class="jspsych-btn" style= "visibility: hidden">%choice%</button>'],
    trial_duration: 3500,
    prompt: '<p style = "font-size: 20pt"> One of these two family members is also called your <b>' + randomised_labels[0] + '</b>.',
    stimulus: function(c){build_stimulus(c,randomised_labels,initial_referent,targets,boxes=true)},
  },
  // then, two labels appear on screen and they can drag and drop them to the correct target
  {choices: ['Continue'],
  button_html: ['<button disabled class="jspsych-btn" id="jspsych-continue-btn">%choice%</button>'],
  stimulus: function(c){build_stimulus(c,randomised_labels,initial_referent,targets,boxes=true,categorisation=true)},
  prompt: function(){if(attention){var prompt = '<p style = "font-size: 20pt">Choose the correct word for each family member in English by dragging and dropping the labels beneath them.'}
  else{var prompt = '<p style = "font-size: 20pt">Choose a word for each family member by dragging and dropping the labels beneath them.'}
  return prompt},
  data: {feature1: manip.substring(0,4),
    feature2: manip.substring(5,10),
    exemplar_label: randomised_labels[0],
    exemplar: initial_referent,
    target1: targets[0],
    target2: targets[1],
  },
  on_finish: function(data){
    // on finish, work out which label they assigned to which kin and save that data
    data.target1_choice = ks[targets[0]]
    data.target2_choice = ks[targets[1]]

    if(ks[targets[0]] === randomised_labels[0]){
      data.chosen_target = targets[0]
      data.correct = 'Y'
      if(manip != 'attn'){data.chosen_feature = data.feature1}
    else{}
    } else {
      data.chosen_target = targets[1]
      data.correct = 'N'
      if(manip != 'attn'){data.chosen_feature = data.feature2}
    else{}
  }

    save_data_line(data)
  }
},
// fixation cross to show in between trials
{type: jsPsychCanvasButtonResponsePromptabovestimulus,
  stimulus: function(c){},
  prompt: '<br><p style="font-size:40pt">+</p>',
  choices: ['choice'],
  button_html: ['<button disabled class="jspsych-btn" style= "visibility: hidden">%choice%</button>'],
  trial_duration: 1500,
  response_ends_trial: false}
  ]
}


return trial
} // end of function


// now let's use that function to actually build the critical trials -
// we want them in a random order, and to randomly sample from the possible
// minimal triads (in `feature_pairs`)
let categorisation_trials = []

index = 0

for(manip in feature_pairs){ // for each feature contrast
  var trio = jsPsych.randomization.sampleWithoutReplacement(feature_pairs[manip])[0] // choose a minimal triad
  targets = [trio[1],trio[2]] //[1] and [2] are the targets
  initial = trio[0] // and [0] is the exemplar

  var trial_labels = label_choices[index]

  var trial = categorisation_trial(manip,trial_labels,targets,initial)
  categorisation_trials.push(trial)
  index += 1
}

var categorisation_trials_shuffled = jsPsych.randomization.shuffle(categorisation_trials) //shuffle the trials

var attn_trial = categorisation_trial('attn',['nephew','cousin'],['bs','mbs'],['zs'],true) // make the attention trial (same every time)

attn_trial.timeline.pop() // remove fixation cross from final trial


/******************************************************************************/
/*** Instruction trials *******************************************************/
/******************************************************************************/


var consent_screen = {
  type: jsPsychHtmlButtonResponse,
  stimulus: "<p style='text-align:left'>This study is being conducted by Maisy Hallam under the supervision of Professor Kenny Smith and Professor Simon Kirby at The University of Edinburgh. It has been approved by the PPLS ethics committee (ref. 284-2425/1).</p>\
  <p style='text-align:left'>This task will take approximately 10 minutes to complete, and you will be paid £2.05 for your participation in line with the UK National Minimum Wage.\
  <p style='text-align:left'>Please <a href='http://mhallam.ppls.ed.ac.uk/nifty-fig/consent-form.pdf' target='_blank'>click here to read an information sheet (PDF)</a> about the study and your rights as a participant.\
  <p style='text-align:left'> Clicking the button below indicates that\
  <ul style='text-align:left'>\
    <li>you agree to participate in this study,</li>\
    <li>your first language is English,</li>\
    <li>you are at least 18 years old,</li>\
    <li>you have read the information sheet linked above,</li>\
    <li>you understand how your data will be stored and used, and </li>\
    <li>you understand that you have the right to terminate this session at any point.</li></ul>\
    <p style='text-align:left'>More information about the task and full instructions will be given shortly.",
  choices: ['Yes, I consent to participate'],
};

// stop participants completing the study on a phone or tablet
var anti_mobile = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<h3 style='font-size: 20pt'>Thanks for your interest in our study!</h3> \
  <p style='text-align:left;font-size:20pt'>Please press the <b>space bar</b> to continue.</p>\
  <p style='text-align:left;font-size:20pt'>If you can't press the space bar because you're using a mobile phone or tablet, please switch to a desktop or laptop computer.</p>",
  choices: [' ']
};

// force full screen mode
var full_screen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true
};


var full_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: "<h3 style='font-size: 20pt'>Instructions</h3>\
  <p style='text-align:left;font-size:15pt'>In this study, you will learn words for family members in a number of different languages.\
  <p style='text-align:left;font-size:15pt'>For each language in turn, we'll use a family tree to show you what speakers of this language would call a member of their family.\
  <p style='text-align:left;font-size:15pt'><i>For example, if you speak English, you might call your father's mother your Grandma. But be aware! In these new languages, the words for family relationships may not translate directly into English.</i>\
  <p style='text-align:left;font-size:15pt'>Next, we'll show you two more family members -- but we won't tell you what speakers of this language would call them. \
  <p style='text-align:left;font-size:15pt'><b>Your task is to think like a linguist and guess the missing words. You'll be given a choice of two words, one for each family member. </b>\
  <p style = 'text-align:left;font-size:15pt'>This is not a memory test, so we won't ask you to recall anything. You'll have all the information you need on screen.\
  <p style='text-align:left;font-size:15pt'>When you click 'Next', we will show how to read a family tree. After this demonstration, the study will begin.\
  <p style='text-align:left;font-size:15pt'>The study will take approximately 10 minutes to complete. Press 'Next' when you are ready.<br><br>",
  choices: ['Next >'],
  button_html: '<button class="jspsych-btn" style = "float: right">%choice%</button>',
  };

var trial_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: "<h3 style='font-size: 20pt'>Ready to begin?</h3>\
  <p style='text-align:left;font-size:15pt'>Now that you're more familiar with family trees, the study will begin.\
  <p style='text-align:left;font-size:15pt'>When you click 'Next', we will give you a word for a family relationship in a new language, and show you which family member it refers to.\
  <p style='text-align:left;font-size:15pt'>Then, we'll highlight two more family members, and give you a choice of two words that might be used to describe those relationships. One of these choices is the same as the first word, but the other will be new to you.\
  <p style='text-align:left;font-size:15pt'><b>Your job is to decide: if you were speaking this language, which word would you use to refer to which family member? </b>\
  <p style ='text-align:left;font-size:15pt'>Make your selection by dragging and dropping each word beneath a highlighted family member, then click Continue\
   to move to the next trial when you're finished. You won't be able to continue until you have assigned a word to each highlighted family member.\
  <p style='text-align:left;font-size:15pt'>You'll complete this task for six languages. Click 'Next' when you are ready to begin.",
  choices: ['Next >'],
  button_html: '<button class="jspsych-btn" style = "float: right">%choice%</button>',
}

var final_screen = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<h3 style='font-size: 20pt'>Finished!</h3>\
  <p style='text-align:left;font-size:15pt'>Thanks for participating! We hope you enjoyed this study.\
  <p style='text-align:left;font-size:15pt'>If you're curious: in this study we were interested in how people group family members together linguistically.\
  <p style='text-align:left;font-size:15pt'>There are a number of ways to do this: for example English speakers group mother's brothers and father's brothers into a single word, 'uncle', but Hindi speakers have a different word for father and mother's brothers. Across the world's languages,\
    we have found evidence that some strategies are more common than others, so here we were testing whether this common pattern has to do with a preference for certain kinds of groupings in the human mind.\
  <p style='text-align:left;font-size:15pt'> Thank you for contributing to our knowledge about language and cognition!\
  <p style = 'text-align:left;font-size:15pt'> Click the button below to return to Prolific and complete the study. The completion code is " + COMPLETION_CODE + '.',
  choices: ["Take me to Prolific"],
};

// closing survey
var survey = {
  preamble: '<h3>The experiment is almost over. Before you go, please answer the following questions.',
  type: jsPsychSurveyText,
  questions: [
    {prompt: 'How did you decide which word to assign to each family member? Did you notice any similarities or differences between each pair of family members?', name: 'strategy', required: true},
    {prompt: "Optional: Do you have any other feedback for us about this experiment?",name: 'feedback', required: false}
  ],
  button_label: 'Finish experiment',
  on_finish: function(data){
    save_survey(data)
  }
}

// write column headers to data file
var write_headers = {
  type: jsPsychCallFunction,
  func: function () {
    save_data(
      "nifty-fig-data/" + participant_id + ".csv",
      "prolific_id,random_id,condition,feature1,feature2,exemplar,target1,target2,exemplar_label,target1_choice,target2_choice,chosen_target,correct,chosen_feature,trial_index,time_elapsed,rt\n"
    );
  },
};

// write column headers to survey data file
var write_survey_headers = {
  type: jsPsychCallFunction,
  func: function () {
    //write column headers to perceptuallearning_data.csv
    save_data(
      "nifty-fig-data/surveys/" + participant_id + "_survey.csv",
      "prolific_id,random_id,condition,strategy,feedback\n"
    );
  },
};

// allow participants to zoom in or out so we know they'll be able to see the full experiment trial
var resize_screen = {
  type: jsPsychCanvasButtonResponsePromptabovestimulus,
  canvas_size: [(img_height + 100),(img_width + 70)],
  stimulus: function(c){
    // create canvas
    var canvas = new fabric.Canvas(c)

    // prevent multiselecting/grouping the two labels
    canvas.selection = false

    var rectangle = new fabric.Rect({
     left: 0,
     top: 0,
     fill: 'blue',
     height: img_height + 100,
     width: img_width + 70,
     // remove all interactions
     evented: false
   });

   rectangle.scaleToHeight(img_height);
   rectangle.scaleToWidth(img_width);

   canvas.add(rectangle)
   },
  prompt: "<p style='font-size: 20px'>Please zoom out until you can see everything on this page <b>without scrolling</b>.<br>\
  If the rectangle and the Continue button already fit within your window, you're good to go!</p>",
  choices: ["Continue"]
}

/******************************************************************************/
/*** Build the timeline *******************************************************/
/******************************************************************************/

var full_timeline = [].concat(
preload,
anti_mobile,
consent_screen,
write_headers,
write_survey_headers,
full_screen,
resize_screen,
full_instructions,
tree_walkthrough(),
trial_instructions,
categorisation_trials_shuffled,
attn_trial,
survey,
final_screen)

/******************************************************************************/
/*** Run the timeline *******************************************************/
/******************************************************************************/

jsPsych.run(full_timeline);
