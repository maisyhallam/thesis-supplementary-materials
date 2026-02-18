/******************************************************************************/
/*** Initialise jspsych *******************************************************/
/******************************************************************************/


var jsPsych = initJsPsych({
  show_progress_bar: true,
  on_finish: function () {
    window.location = "https://app.prolific.com/submissions/complete?cc=CEZYXKWQ"; 
  },
});

/******************************************************************************/
/*** Housekeeping *************************************************************/
/******************************************************************************/

var participant_id = jsPsych.data.getURLVariable('PROLIFIC_PID')

// var participant_id = jsPsych.randomization.randomID(10)

var random_id = jsPsych.randomization.randomID(10)

// var PROLIFIC_COMPLETION_CODE = "C18F7U1G" 

// what order of presentation is the tree in?
var condition = jsPsych.randomization.sampleWithoutReplacement(['mfgb','fmgb','fmbg','mfbg'],1)[0]

// console.log(condition)

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
    data.block,
    data.system,
    data.trial_type,
    data.selectee,
    data.selection,
    data.expected,
    data.correct,
    data.undo,
    data.done,
    data.generaliser1,
    data.generaliser1_term,
    data.generaliser2,
    data.generaliser2_term,
    data.generaliser3,
    data.generaliser3_term,
    data.generaliser4,
    data.generaliser4_term,
    data.catch_failed,
    data.button_number,
    data.trial_index,
    data.time_elapsed,
    data.rt,
  ];
  // join these with commas and add a newline
  var line = data_to_save.join(",") + "\n";
  save_data("ambiguous_papaya_data/" + participant_id + ".csv", line);
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
  save_data("ambiguous_papaya_data/surveys/" + participant_id + "_survey.csv", line);
}


/******************************************************************************/
/*** Stimuli ***** *************************************************************/
/******************************************************************************/

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
"fbs": "father's brother's son"}

// list of shorthand codes, ordered by tree position
if(condition === 'mfgb'){
  var relatives = ['mz','mb','m','f','fz','fb','mzd','mzs','mbd','mbs','z','b','fzd','fzs','fbd','fbs']}
else if(condition === 'fmgb'){
  var relatives = ['fz','fb','f','m','mz','mb','fzd','fzs','fbd','fbs','z','b','mzd','mzs','mbd','mbs']}
else if (condition === 'fmbg'){
  var relatives = ['fb','fz','f','m','mb','mz','fbs','fbd','fzs','fzd','b','z','mbs','mbd','mzs','mzd']}
else if(condition ==='mfbg') {
  var relatives = ['mb','mz','m','f','fb','fz','mbs','mbd','mzs','mzd','b','z','fbs','fbd','fzs','fzd']}


// trees = ['tree1','tree2','tree3','tree4']
var trees = ['tree1','tree2','tree3','tree4','tree1','tree2','tree3','tree4']
var languages = ['Zolawęngï','Pukepapu','Øwar', 'Aluwut', 'Khêvkkêf', 'Vpižodvipe', 'Tuuquhaïbö','Đăonuu']


// an object that contains labels for each language
// var terminology = {
// 'Blarn': ['taneko', 'sakana', 'torine', 'kumoto', 'hitozo', 'kazume', 'sorane', 'kanabi'],
// 'Meepmop': ["wibrata", "zalepka", "grzywka", "dzwonka", "plotnik", "chwytak", "szarpak", "bletnek"],
// 'Skriwa': ['takasa', 'mizuri', 'kawaku', 'hitaka', 'haneba', 'kumara', 'sotema', 'nebido'],
// 'Plang': ['wahina', 'korero', 'tawhai', 'mahina', 'purere', 'whakat', 'kopara', 'tihore'],
// 'Flunf': ['marapo', 'zonape', 'vitage', 'galape', 'senone', 'cibono', 'pecato', 'golano'],
// 'Tula': ['puli', 'laro', 'cenu', 'favo', 'rupi', 'cina', 'bila', 'gola'],
// 'Cneep': ['blup', 'dorn', 'krel', 'zipt', 'fank', 'glim', 'vorp', 'wexy'],
// 'Krimbap': ['sora', 'taki', 'kuni', 'zona', 'fune', 'hana', 'kawa', 'sena']
// }

var terminology = {
  'Zolawęngï': ['kïmy', 'qïru', 'bokokohï', 'zuvewu', 'męwaqïfe', 'morïky', 'ryvïri', 'lobowaby','bybï','hïlaki'],

  'Pukepapu': ['kawuka',  'goviku', 'lawolu', 'popingi', 'wupu', 'ngapapu', 'powisunge', 'lepego','luge','pygele'],
  
  'Øwar': ['aqinudød', 'øqoç', 'aweh', 'orinoçim',  'içiqusem', 'iqur', 'ømenad', 'adeçim','emøyeç','uquçun'],
  
  'Aluwut': ['azuf', 'egezalat', 'ozatof', 'otev', 'ulywaf', 'idanuluf', 'agivud', 'ilug', 'etupol','awupav'],
  
  'Khêvkkêf': ['kvurddåh', 'rhymsvåd', 'rhåv', 'ktot', 'tsåvvses', 'svik', 'ktåvrhus', 'smêvskêv','vrêd','sfêvdok'],
  
  'Vpižodvipe': ['vbāžo', 'rbāranžā', 'nžodo', 'pžicā', 'žbodu',  'vropcāre',  'vruži', 'ngcāžo','byure','cžunge'],
  
  'Tuuquhaïbö': ['šïïnö', 'cöahido',  'šaaqaude',  'nuubö', 'töeqo', 'tuumïhu', 'yaöpe', 'beiguumu','canšuehu','möïtu'],
  
  'Đăonuu': ['taobyo', 'nyumuo', 'goozăi',  'qăo', 'niuhiê', 'baumiă',  'gêă', 'huanăa','nyumuo','hyonăo']}

// essentially timeline variables; this lets us populate the instructions with details and images about each language
var details = {
'Đăonuu': ['is spoken by a small community living remotely in an arctic region, mostly undisturbed by nearby urban populations.','arctic-region.jpg'],
'Vpižodvipe': ['is a dialect spoken by the local population of a small ski resort. They are isolated for much of the year until the first snowfall when visitors begin to arrive.','ski-resort.jpg'],
'Øwar': ["is a dialect developed by a community of spiritual practitioners who live in isolation from the rest of their country's population.",'spiritual-monks.jpg'],
'Pukepapu': ['is spoken by the population of a small island, located near the mainland but cut off by heavy ocean currents.','island-nation.jpg'],
'Zolawęngï': ['is spoken by a populace who live deep within a pine forest who live as forest rangers and protect the natural habitat.','pine-forest.jpg'],
'Tuuquhaïbö': ['is an endangered language spoken by a nomadic community who travel by cart and horse across the plains, never stopping in one settlement for long.','nomadic-people.jpg'],
'Khêvkkêf': ['was spoken in a rural farming community that has largely gone extinct. Luckily, lots of the basic vocabulary was recorded by anthropologists over the last century.','farming-community.jpg'],
'Aluwut': ['is the native language of a population who are almost entirely bilingual. They use the national language day to day, and prefer to only use their heritage language privately in the home.', 'heritage-home.jpg']
}


var trees = jsPsych.randomization.shuffle(trees)
var languages = jsPsych.randomization.shuffle(languages)

var language_types = [[['m'],['f'],['mz','mb','fz','fb'],['z','b'],['mzd','mzs','mbd','mbs','fzd','fzs','fbd','fbs']], //0
                    [['m'],['f'],['mz','mb'],['fz','fb'],['z','b'],['mzd','mzs','mbd','mbs'],['fzd','fzs','fbd','fbs']], //1 
                    [['m'],['f'],['mz','fz'],['mb','fb'],['z','b'],['mzd','mzs','fzd','fzs'],['mbd','mbs','fbd','fbs']], //2 
                    [['m'],['f'],['mz','fb'],['mb','fz'],['z','b'],['mzd','mzs','fbd','fbs'],['mbd','mbs','fzd','fzs',]], //3
                    [['m'],['f'],['mz','mb','fz'],['fb'],['z','b'],['mzd','mzs','mbd','mbs','fzd','fzs'],['fbd','fbs']], //4
                    [['m'],['f'],['mz','mb','fb'],['fz'],['z','b'],['mzd','mzs','mbd','mbs','fbd','fbs'],['fzd','fzs']], //5
                    [['m'],['f'],['mz','fz','fb'],['mb'],['z','b'],['mzd','mzs','fbd','fbs','fzd','fzs'],['mbd','mbs']], //6
                    [['m'],['f'],['fz','mb','fb'],['mz'],['z','b'],['fbd','fbs','mbd','mbs','fzd','fzs'],['mzd','mzs']]] //7



//a function that builds a list of all our stimuli images
// function list_of_stims() {
// stims = []
// // for (var i = 0; i < 1; i++)
// stims.push('images/tree.png','images/tree1.png','images/tree2.png','images/tree3.png','images/tree4.png','images/you-tree.png','images/par-tree.png',
// 'images/sibs-tree.png','images/msib-tree.png','images/mcous-tree.png','images/fsib-tree.png')
// return stims
// }

var image_names = ['tree1','tree2','tree3','tree4','you-tree','par-tree',
'sibs-tree','lsib-tree','lcous-tree','rsib-tree', 'full-tree','valley-village','ski-resort','spiritual-monks',
'island-nation','pine-forest','nomadic-people','historical-documents','mountainous-region']

images = []

for(image of image_names){
  if(~image.indexOf('tree')){
    images.push('images/' + condition + '/' + image + '.png')
  }
  else{
    images.push('images/' + image + '.jpg')
  }
}


// a trial that preloads all the necessary images
var preload = {
type: jsPsychPreload,
images: images,
auto_preload: true,
message: '<p>Loading experiment...',
error_message: '<p>The experiment failed to load. Please refresh the page to try again.'}


// global variable to set the height and width of the tree images
var img_width = 4000*0.3
var img_height = 1620*0.3


// coordinates for each label under each relative


// var coordinates = {
//   'mz':[370,185],
//   'mb': [1070,185],
//   'm': [1770,185],
//   'f': [2200,185],
//   'fz': [2860,185],
//   'fb': [3610,185],
//   'mzd': [190,1000],
//   'mzs': [550,1000],
//   'mbd':[890,1000],
//   'mbs': [1250,1000],
//   'z': [1620,900],
//   'b': [2360,900],
//   'fzd': [2680,1000],
//   'fzs': [3045,1000],
//   'fbd': [3430,1000],
//   'fbs': [3790,1000]}

//   console.log('original coordinates',coordinates)

  var positions = [[370,185],[1070,185],[1770,185],[2200,185],[2860,185],[3610,185],[190,1000],[550,1000],[890,1000],[1250,1000],[1620,900],[2360,900],[2680,1000],[3045,1000],[3430,1000],[3790,1000]]

var coordinates = {}
for(var i in relatives){
  coordinates[relatives[i]] = positions[i]
}


// a function that makes an image object, to reduce clutter later
function make_image_object(image){
var image_object = new Image()
image_object.src = './images/' + condition + '/' + image + '.png'
return image_object}

// a function that builds the family tree on a canvas, with labels added under relatives dynamically
function build_family_tree(canvas,tree,ks,selection=false,observe_to=false,labelling=true){

// create canvas
var ctx = canvas.getContext("2d")
// set font
ctx.font = 'bold 18px Open Sans';


// make image objects
var tree = make_image_object(tree)

// load image objects in position
tree.onload = function(){

  // add rectangle behind a face if this is a selection trial
  if(selection){
    ctx.beginPath();
    x =  (coordinates[selection][0])  * 0.3 - 50 // minus half the width of the box, 100px
    y =  (coordinates[selection][1]) * 0.3
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = 'yellow'
    ctx.fillRect(x , y, 100, 100);
    ctx.lineWidth = "3";
    ctx.strokeStyle = "brown";
    ctx.fillStyle = 'black'
    ctx.globalAlpha = 1.0;
    ctx.rect(x,y,100,100)
    ctx.stroke();
    }

  ctx.drawImage(tree, canvas.width / 2 - tree.width*0.3 / 2,
  canvas.height / 2 - tree.height*0.3 / 2, img_width,img_height)

  if(labelling){

  for (i in ks){ // for every label, ordered by left-right top-bottom
    if(relatives.indexOf(i) > 5 && i != 'b' && i != 'z'){var height = 120} else {var height = 140}
    var label = ks[i] 
    var metrics = ctx.measureText(label); // measure text width so we can centre the text under each image
    var text_width = metrics.width
    ctx.fillText(label, // add the label underneath the relative (if unlabelled, "", nothing will appear)
      ((canvas.width / 2 - img_width / 2) + coordinates[i][0]*0.3) - (text_width * 0.5),
      ((canvas.height / 2 - img_height / 2) + height + coordinates[i][1]*0.3)) // place each label at the correct coordinates for each relative
  if(observe_to){if(i === observe_to){break}}
 }
}
}
}

// may have to tweak the above so that the function knows which set of coordinates goes with which person rather than just going by index (so you can vary who is labelled and who is not)
// or when you generate a set of labels for relatives, you could have ' ' for relatives who are to be unlabelled


/******************************************************************************/
/*** Tree observation trials **************************************************/
/******************************************************************************/

function tree_walkthrough(){

  var t0 = {
    type: jsPsychHtmlButtonResponse,
    choices: ['Next >'],
    stimulus: "<p style='font-size:15pt'> During this experiment, you will see a number of family trees. <br><br> Before we start, let's go through one.<br><br>",
    }


  if(condition === 'mfgb' || condition === 'mfbg'){
    var parent = ['mother', 'father']}
  else {var parent = ['father', 'mother']}

  if(condition === 'mfgb' || condition === 'fmgb'){
    var sibling = ['sister','brother']
    var child = ['girl','boy'] }
  else{
    var sibling = ['brother','sister'];
    var child = ['boy','girl']}

  // you
  var t1 = tree_trial('you-tree',shorthand,false, '<p style="font-size:15pt">During this study, try to imagine yourself at the centre of a family tree.',false)
  //parents
  var t2 = tree_trial('par-tree',shorthand, false,'<p style="font-size:15pt">You have a ' + parent[0] + ' and a ' + parent[1] + '.',false)

  //siblings
  var t3 = tree_trial('sibs-tree', shorthand, false, '<p style="font-size:15pt">You also have a ' + sibling[0] + ' and a ' + sibling[1] + '.',false)

  // nuncles
  var t4 = tree_trial('lsib-tree', shorthand, false, "<p style='font-size:15pt'>These are your " + parent[0] + "'s " + sibling[0] + " and " + sibling[1] + ".",false)

  var t5 = tree_trial('lcous-tree', shorthand, false, "<p style='font-size:15pt'>Your " + parent[0] + "'s " + sibling[0] + " and " + sibling[1] + " each have two children, a " + child[0] + " and a " + child[1] + ".",false)

  var t6 = tree_trial('rsib-tree', shorthand, false, "<p style='font-size:15pt'>Your " + parent[1] + " has a " + sibling[0] + " and a " + sibling[1] + " too.",false)

  var t7 = tree_trial('full-tree', shorthand, false, "<p style='font-size:15pt'>Your " + parent[1] + "'s " + sibling[0] + " and " + sibling[1] + " each have two children, a " + child[0] + " and a " + child[1] + ".",false)

  var t8 = tree_trial('full-tree',shorthand, false, "<p style='font-size:15pt'>And that's everyone! Ready to begin?",false)

  trials = [t0,t1,t2,t3,t4,t5,t6,t7,t8].flat()

  return trials
  }



function tree_trial(tree,kinship_system,relative,prompt,labelling) {
var trial = {
  type: jsPsychCanvasButtonResponsePromptAboveButtons,
  canvas_size: [img_height,img_width],
  choices: ['Next'],
  stimulus: function(c){build_family_tree(c,tree,kinship_system,selection=false,observe_to=relative,labelling=labelling)},
  prompt: prompt}

return trial
}


function label_tree(tree,kinship_system) {
var trials = []


for(var key in kinship_system){
  if(kinship_system[key]){
  var prompt = '<p style="font-size: 15pt"> In this language, your ' + shorthand[key] + ' is called your <b>' + kinship_system[key] + '</b>.'
  trials = [].concat(trials,tree_trial(tree,kinship_system,key,prompt,true))
}}
return trials
}



/******************************************************************************/
/*** Tree selection trials ****************************************************/
/******************************************************************************/


function selection_trial(block,system,tree,ks,full_ks,choices,generaliser1,generaliser2) {

var unseen_terms = [choices[2],choices[3]]

//global variables to update later
var generaliser3 = ""
var generaliser4 = ""
var generaliser3_term = ""
var generaliser4_term = ""

var choices = jsPsych.randomization.shuffle(choices)
choices.push('UNDO','DONE')

var catcher = jsPsych.randomization.sampleWithoutReplacement([generaliser1,generaliser2])[0]
var assigned_labels = []
var to_select = []

// this only runs in order if we iterate through a list! not through object keys
for(var relative of relatives){

  if(ks[relative] === ""){to_select.push(relative)}
  else {
    if(relative === catcher){to_select.push(relative)}
    else{assigned_labels.push(ks[relative])}
  }}

to_select = jsPsych.randomization.shuffle(to_select)

var index = 0
var all_labels_assigned = false // flag so we know when the loop should end
// var all_labels_selected = false
// var selected_labels = [] // flag so we know that the ppt has clicked each button at least once

var trial = {
  type: jsPsychCanvasButtonResponsePromptAboveButtons,
  stimulus: function(c){
    var selectee = to_select[index]
    build_family_tree(c,tree,ks,selectee,labelling=true)
  },
  canvas_size: [img_height,img_width],
  choices: choices,
  button_html: function(){
    if (all_labels_assigned) {
      html = ['<button disabled class="label-btn">%choice%</button>', 
      '<button disabled class="label-btn">%choice%</button>', 
      '<button disabled class="label-btn">%choice%</button>', 
      '<button disabled class="label-btn">%choice%</button>',
      '<button class="func-btn" style = "float: left">%choice%</button>',
      '<button class="func-btn" style = "float: right">%choice%</button>']}
    else {
      html = ['<button class="label-btn">%choice%</button>', 
    '<button class="label-btn">%choice%</button>',
    '<button class="label-btn">%choice%</button>', 
    '<button class="label-btn">%choice%</button>',
    '<button class="func-btn" style = "float: left">%choice%</button>', 
    '<button disabled class="func-btn" style = "float:right">%choice%</button>']
    }

    if(index === 0){
      html[4] = '<button disabled class="func-btn" style = "float: left">%choice%</button>'}
    return html 
  },

  prompt: function(){
    var relative = shorthand[to_select[index]]
    if(to_select[index] === catcher){
      var prompt = '<p style="font-size: 15pt">Are you paying attention? Click the label underneath your <b>' + relative + '</b>.'
    }
    else {
    if(index === 0){var prompt = '<p style="font-size: 15pt">In this language, what would you call your <b>' + relative + '</b>?'}
    else if (all_labels_assigned) {var prompt = "<p style='font-size: 15pt'>Click Done if you're happy with your selection, or click Undo to go back."}
    else {var prompt = '<p style="font-size: 15pt">In this language, what would you call your <b>' + relative + '</b>?'}
    }
    return prompt},

  data: {
    system: system,
    block: block,
    generaliser1: generaliser1,
    generaliser1_term: ks[generaliser1],
    generaliser2: generaliser2,
    generaliser2_term: ks[generaliser2]
  },
  on_finish: function(data){

    var selectee = to_select[index]    

    // add some stuff to data
    data.selectee = selectee // person you are selecting a term for
    data.button_number = data.response
    data.selection = choices[data.response] // the term you selected
    data.expected = full_ks[to_select[index]] // the term we expected
    if(data.expected === data.selection){data.correct = 1} else {data.correct = 0}
    if(selectee === catcher && data.selection != 'UNDO'){
      data.trial_type = 'catch'; // add to data that this is a catch trial
      to_select.splice(to_select.indexOf(catcher),1); // and remove the catcher from the list of people to select from - if the ppt clicks undo, we don't want them to do the catch trial again.
      index -= 1}
    else {data.trial_type = 'critical'}


    if(unseen_terms.includes(data.selection) && selectee != catcher){
		if(generaliser4 && generaliser3){}
		else if (generaliser3 && generaliser4 === ""){
			data.generaliser4 = selectee
			data.generaliser4_term = data.selection
			generaliser4 = selectee
      generaliser4_term = data.selection
      data.generaliser3 = generaliser3
      data.generaliser3_term = generaliser3_term

      unseen_terms.splice(generaliser4,1)}
		else{
			data.generaliser3 = selectee
			data.generaliser3_term = data.selection
			generaliser3 = selectee
      generaliser3_term = data.selection
      data.generaliser4 = generaliser4
      data.generaliser4_term = generaliser4_term

      unseen_terms.splice(generaliser3,1)}}
    else{
      data.generaliser3 = generaliser3
      data.generaliser3_term = generaliser3_term
      data.generaliser4 = generaliser4
      data.generaliser4_term = generaliser4_term
    }

    // console.log(selected_labels, all_labels_selected)
    
    // use participant response to work out what the next trial should be
    if(data.selection === 'UNDO'){ // if it's undo, save this to data and remove the last choice the ppt made
      data.undo = 1;
      data.done = 0
      if(to_select[index-1] != catcher) {ks[to_select[index-1]] = ""}; 
       assigned_labels.splice(-1);
       all_labels_assigned = false;
      //  selected_labels.splice(-1,1);
      //  all_labels_selected = false 
       index -= 1} 

    else if(data.selection === 'DONE'){ // if it's done, save this to data and move on
      data.done = 1
      data.undo = 0
      assigned_labels.push(data.selection); 
      index += 1
    }

    else { // otherwise, they gave a new response, so we add the choice to assigned labels, which moves us on to selecting the next person
      if(selectee === catcher){} else{ks[selectee] = data.selection}; 
      data.undo = 0;
      data.done = 0;
      assigned_labels.push(data.selection); 
      // selected_labels.push(data.selection);
      // if(selected_labels.includes(choices[0]) && selected_labels.includes(choices[1])){all_labels_selected = true}
      index += 1}

    // when all labels are assigned, we know to end the loop
    if(assigned_labels.length === 16) {
        all_labels_assigned = true}
    
    // if it's a catch trial and they failed, save this
    if(data.trial_type === 'catch' && data.selection != 'UNDO' && data.correct === 0){data.catch_failed = true}
    else if(data.trial_type === 'catch' && data.correct === 1) {data.catch_failed = false}
    else {data.catch_failed = ""}

    // finally, save the trial data
    save_data_line(data)
  }
}

var loop = {
timeline: [trial],
loop_function: function(){
  var last_trial = jsPsych.data.getLastTrialData().values()[0]
  var choice = last_trial.selection
  if(choice === 'DONE') {return false}
  if(assigned_labels.length < 17) {return true} else {return false}
}
}

return loop
}

// a function that takes a system (i.e. a configuration of which kin share a term or not), a list of terminology, and assigned kin terms to relatives
function build_ks(full = true, system, terminology, g1, g2){
  ks = {}


  // for a full ks
  if(full){
    for(var group in system){ // for each group of relatives in the system (ie those who share a label)

      for(var relative of system[group]){ // for each relative in the group

        ks[relative] = terminology[group] //give them a label in the language 
      }
    }
  }

  // for a ks with unlabelled relatives
  else {
  
    system.splice(-2,2) // remove the final two groups from the system; we don't want these to be initially labelled

    system.push([g2],[g1]) // except for the two generalisers, so we add those back in

      for(var group in system){ // for each group of relatives in the system (ie those who share a label)
        for(var relative of system[group]){ // for each relative in the group
          ks[relative] = terminology[group] //give them a label in the language 
        }
      }
      // then, if any relatives remain unlabelled, set their value to an empty string
      for(var relative of relatives){ 
        if(relative in ks) {} else {ks[relative] = ""}
      }
    }

  return ks
}

// a function that builds a bunch of trial sets for each of our system types, randomising which tree and which labels are associated with each system

function build_timeline(){
var timeline = []

// set an index for block number
var index = 0

// shuffle the order of languages
var language_types_shuffled = jsPsych.randomization.shuffle(language_types)

for(var system of language_types_shuffled){ // types is a list of possible kinship systems

  // index the unshuffled list so we know which system the participant will see
    var system_type = language_types.indexOf(system)

  // choose generalisers - the labelled kin that we want participants to generalise from
    var generaliser1 = jsPsych.randomization.sampleWithoutReplacement(system[system.length-1])[0] 
    var generaliser2 = jsPsych.randomization.sampleWithoutReplacement(system[system.length-2])[0]
  
  // choose which language name, labels and tree the participant will see; these are already shuffled globally
    var language = languages[index] 
    var terms = jsPsych.randomization.shuffle(terminology[language])
    var tree = trees[index] 
    // var tree = trees[0]
  
  // now let's build the kinship system: keys are relatives, values are labels
  // first the full kinship system, with all relatives labelled (for our own reference)
    var full_ks = build_ks(full=true,system,terms,generaliser1,generaliser2)

  // then the incomplete kinship system that determines what the participant sees

    var ks = build_ks(full=false,system,terms,generaliser1,generaliser2)
  
  // work out what our two button labels should be (the labels used for the generalisers)
    var button_labels = [ks[generaliser1],ks[generaliser2],terms[terms.length-1],terms[terms.length-2]]

    // console.log(button_labels)


  // now we can build trials, first the intro trial
    // var intro = intro_trial(language,details[language],index)

  // then the exposition trials
    // var tree_trials = label_tree(tree,ks)

  // then the selection trials
    var selection_trials = selection_trial(index + 1,system_type,tree,ks,full_ks,button_labels,generaliser1,generaliser2)

  // and concat them into one timeline
    var section = [selection_trials].flat()
  // timeline = [].concat(timeline, tree_trials, selection_trials)
    timeline = [].concat(timeline,[section])

  // increase index by 1, so that the next block is n+1, and the loop chooses the next tree, the next language, etc
    index += 1
}

// timeline = jsPsych.randomization.shuffle(timeline)

  
return timeline.flat()
}


// timeline = build_timeline()

/******************************************************************************/
/*** Instruction trials *******************************************************/
/******************************************************************************/

function intro_trial(language_name,detail,index) {
if(index === 0){var number = 'first'} else {var number = 'next'}

var trial = {
  type: jsPsychImageButtonResponsePromptAboveButtons,
  stimulus: 'images/' + detail[1],
  stimulus_height: 350,
  prompt: "<p style ='text-align:left; font-size: 12pt'>The " + number + " language you will see is called " + language_name + ". It is " + detail[0] + "\
  <p style = 'text-align: left; font-size: 12pt'> When you click 'Next', we'll show you how you'd refer to your family members if you spoke " + language_name + ".\
  <p style = 'text-align:left; font-size:12pt'> But remember, we don't have a complete record of the language. Your task is to use your intuition to choose the word \
  that you think fills each gap best. You'll have a choice of four words to decide between, but you can choose as many of these as you like.\
  <p style = 'text-align:left; font-size:12pt'> Press 'Next' when you are ready to begin.",
  button_html: '<button class="jspsych-btn" style = "float: right">%choice%</button>',
  choices: ['Next >']
}
return trial
}


var consent_screen = {
  type: jsPsychHtmlButtonResponse,
  stimulus: "<p style='text-align:left'>This study is being conducted by Maisy Hallam under the supervision of Professor Kenny Smith and Professor Simon Kirby at The University of Edinburgh. It has been approved by the PPLS ethics committee (ref. 262-2324/1).</p>\
  <p style='text-align:left'>This task will take approximately 15 minutes to complete, and you will be paid £2.86 for your participation.\
  <p style='text-align:left'>Please <a href='http://mhallam.ppls.ed.ac.uk/ambiguous-papaya/consent-form.pdf' target='_blank'>click here to read an information sheet (PDF)</a> about the study and your rights as a participant.\
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
}

var anti_mobile = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<h3 style='font-size: 20pt'>Thanks for your interest in our study!</h3> \
  <p style='text-align:left;font-size:12pt'>Please press the <b>space bar</b> to continue.</p>\
  <p style='text-align:left;font-size:12pt'>If you can't press the space bar because you're using a mobile phone or tablet, please switch to a desktop or laptop computer.</p>",
  choices: [' ']
}

var full_screen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true}


  var instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "<h3 style='font-size: 18pt'>Instructions</h3>\
    <p style='text-align:left;font-size:11pt'>In this study, you will learn words for family members in eight newly discovered languages.\
    <p style='text-align:left;font-size:11pt'>For each language in turn, we'll use a family tree to show you what speakers of this language would call different members of their family.\
    <p style='text-align:left;font-size:11pt'>For example, if you speak English, you might call your father's mother your Grandma. However, be aware that in these new languages, the words for family\
     relationships may not translate directly into English.\
    <p style='text-align:left;font-size:11pt'>The documentation we have for these languages is limited, so while we know a lot of the words, we aren't sure which family members they refer to.\
    After you learn the words we do know, we'll ask you to use your intuition to fill in the gaps in our knowledge. \
    <p style='text-align:left;font-size:11pt'><b>Your task is to think like a linguist and predict the missing words: what do you think speakers of each language would call these family relationships?</b>\
    <p style = 'text-align:left;font-size:11pt'>This is not a memory test, so we won't ask you to recall anything. You'll have all the information you need on screen.\
    <p style='text-align:left;font-size:11pt'>When you click 'Next', we will show you what a family tree looks like. After this demonstration, the study will begin.\
    <p style='text-align:left;font-size:11pt'>The study will take approximately 15 minutes to complete. Press 'Next' when you are ready.<br><br>",
    choices: ['Next >'],
    button_html: '<button class="jspsych-btn" style = "float: right">%choice%</button>'
    }


var final_screen = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<h3 style='font-size: 20pt'>Finished!</h3>\
  <p style='text-align:left;font-size:12pt'>Thanks for participating! We hope you enjoyed this study.\
  <p style='text-align:left;font-size:12pt'>Before you finish, please take a moment to read this debrief.\
  <p style='text-align:left;font-size:12pt'>In this study, we told you you were learning words for family in eight newly discovered languages. This was a deception, designed to elicit more natural answers from you.\
  The languages you saw in this study were created for research purposes; they do not exist and are not truly spoken by any real community. Any similarities between these artificial languages\
  and a known real language are unintentional.\
  <p style='text-align:left;font-size:12pt'> The goal of this study was not to build complete records of new languages. Instead, we are interested in the strategies people use to group family members together\
  linguistically. We have found evidence that there are preferred strategies across the world's languages, and here we were testing whether this has to do with a human cognitive preference for certain kinds of categories.\
  Thank you for contributing to our knowledge about language and cognition!\
  <p style = 'text-align:left;font-size:12pt'> Click the button below to return to Prolific and complete the study.",
  choices: ["Take me to Prolific"],
};


var survey = {
  preamble: '<h3>The experiment is almost over. Before you go, please answer the following questions.',
  type: jsPsychSurveyText,
  questions: [
    {prompt: 'How did you decide which words to use? Did you notice any patterns in how these languages group family members together?', name: 'strategy', required: true},
    {prompt: "Optional: Do you have any other feedback for us?",name: 'feedback', required: false}
  ],
  button_label: 'Finish experiment',
  on_finish: function(data){
    save_survey(data)
  }
}


var write_headers = {
  type: jsPsychCallFunction,
  func: function () {
    //write column headers to perceptuallearning_data.csv
    save_data(
      "ambiguous_papaya_data/" + participant_id + ".csv",
      "prolific_id,random_id,condition,block,system,trial_type,selectee,selection,expected,correct,undo,done,generaliser1,generaliser2,catch_failed,button_number,trial_index,time_elapsed,rt\n"
    );
  },
};

var write_survey_headers = {
  type: jsPsychCallFunction,
  func: function () {
    //write column headers to perceptuallearning_data.csv
    save_data(
      "ambiguous_papaya_data/surveys/" + participant_id + "_survey.csv",
      "prolific_id,random_id,condition,strategy,feedback\n"
    );
  },
};

/******************************************************************************/
/*** Build the timeline *******************************************************/
/******************************************************************************/


var full_timeline = [].concat(
preload,
anti_mobile,
consent_screen,
full_screen,
// write_headers,
write_survey_headers,
instructions,
tree_walkthrough(),
build_timeline(),
survey,
final_screen
);

/******************************************************************************/
/*** Run the timeline *******************************************************/
/******************************************************************************/


jsPsych.run(full_timeline);
