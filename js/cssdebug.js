// https://github.com/lucagez/Debucsser/

// Scroll down for Debucsser configurations
// check out repo and docs at:
// https://github.com/lucagez/Debucsser

class Debucsser {
    constructor(props) {
        this.config = props || {};
        this.color = this.config.color || '#c678dd';
        this.width = this.config.width || '2px';
        this.style = this.config.style || 'solid';
        this.grayscaleOnDebug = this.config.grayscaleOnDebug || false;
        this.grayscaleOnDebugAll = this.config.grayscaleOnDebugAll || false;
        this.string = `${this.width} ${this.style} ${this.color}`;
        this.mainKey = this.config.mainKey || 17;
        this.secondKey = this.config.secondKey || 16;
        this.abortKey = this.config.secondKey || 27;
        this.leftKey = this.config.secondKey || 37;
        this.rightKey = this.config.secondKey || 39;
        this.init = this.init.bind(this);
        this.debug = this.debug.bind(this);
        this.debugAll = this.debugAll.bind(this);
        this.stop = this.stop.bind(this);
        this.addClass = this.addClass.bind(this);
        this.labels = this.labels.bind(this);
        this.createGlobalClass = this.createGlobalClass.bind(this);
        this.removeGlobalClass = this.removeGlobalClass.bind(this);
    }
    init() {
        // initialize invisible label element => we'll make it visible on selected keystroke
        this.label = document.createElement('div');
        this.label.classList.add('debucsser-label');
        this.label.id = 'dragdiv';
        this.label.style = 'display: none;';
        document.body.appendChild(this.label);

        this.inject_label_style();
        this.createDebugStyle();
        this.debug();
        this.switchElement();
        this.globalStyle = this.createGlobalClass();

    }
    stopMoving() {
        // LEFT CLICK
        document.addEventListener('click', (key) => {
            key.preventDefault();
            document.removeEventListener('mouseover', this.addClass, true);
            document.removeEventListener('mousemove', this.labels, true);
        });
    }


    debug() {
        // console.log(this);
        document.addEventListener('keydown', (key) => {
            // deb(key.keyCode)
            if (key.keyCode == this.mainKey) {
                document.addEventListener('mousemove', this.labels, true);
                document.addEventListener('mouseover', this.addClass, true);
                document.addEventListener('keydown', this.debugAll, true);
            }
            this.stopMoving();
            this.stop();

        });
    }
    stop() {
        const closedebu = document.getElementById('closedebu');
        document.addEventListener('click', (key) => {
            if (key.target.id == 'closedebu') {
                document.removeEventListener('mouseover', this.addClass, true);
                document.removeEventListener('mousemove', this.labels, true);
                this.label.style = 'display: none;';
            }
        })
    }
    addClass(over) {
        // deb(over,'over')
        over.target.classList.add('debucsser');
        document.addEventListener('mouseout', (out) => {
            out.target.classList.remove('debucsser');
        }, true);
    }
    debugAll(key) {
        if (key.keyCode == this.secondKey) {
            document.body.appendChild(this.globalStyle);
            document.addEventListener('keyup', this.removeGlobalClass, true)
        }
    }
    createDebugStyle() {
        const style = document.createElement('style');
        style.innerHTML = `
      .debucsser {
        outline: ${this.string};
        ${this.config.grayscaleOnDebug && 'filter: grayscale(100%);'}
      }
    `;
        document.body.appendChild(style);
    }
    createGlobalClass() {
        const global = document.createElement('style');
        global.innerHTML = `
      * {
        outline: ${this.string};
        ${this.config.grayscaleOnDebugAll && 'filter: grayscale(100%);'}
      }
    `;
        return global;
    }
    removeGlobalClass(key) {
        if (key.keyCode == this.secondKey) {
            document.body.removeChild(this.globalStyle);
        }
    }
    switchElement() {
        // document.addEventListener('keydown', (key) => {
        //     if (key.keyCode == this.leftKey) { 
        //     deb(key)
        //     //   deb(key.target)
        //       // deb(this)
        //       // document.addEventListener('mouseover', this.labels, true);

        //       this.labels.apply(key);
        //       } 

        // });
    }
    labels(e) {
            // deb(e, 'e')
            // deb(arguments)

            // let targetElem = e.target
            // document.addEventListener('keydown', (key) => {
            //     if (key.keyCode == this.leftKey) {
            //         // deb(key.keyCode)
            //         deb(e.target.parentNode)
            //         targetElem = e.target.parentNode
            //     }
            // });
            // deb(targetElem, 'targetElem')

            if (e.target) {
                const classList = e.target.classList ? e.target.classList.value.replace('debucsser', '') : undefined;
                const id = e.target.id ? '#' + e.target.id : undefined;
                const nodeName = e.target.nodeName ? '' + e.target.nodeName : undefined;
                const name = e.target.name ? '' + e.target.name : undefined;
                const dimensions = e.target.getBoundingClientRect();
                // const styles = '' //getAppliedComputedStyles(e.target);

                // deb(dumpCSSText(e.target))

                this.label.innerHTML = `
        <div class=topper>
          <span class=ghlogo>
            <a href="https://github.com/LasaMel/Needful-Things/blob/main/cssDebugHelper.js" target="_blank"><svg height="16" viewBox="0 0 16 16" version="1.1" width="16px" class="octicon">
                <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg></a>
          </span>
          <span>debucsser</span>
          <span id=dragheader >✥</span>
          <span id=closedebu></span>
        </div>
        <div>tag:   <label class=copy >${nodeName.toLowerCase() || ` `}</label></div>
        <div>id:    <label class=copy >${id || ` `}</label></div>
        <div>class: <label class=copy >${classList || ` `}</label></div>
        <div>name:  <label class=copy >${name || ` `}</label></div>
        <div>size:  <label class=copy >${dimensions.width.toFixed(0)}px</label> × <label>${dimensions.height.toFixed(0)}px</label></div>
        <div id=getStyle>getComputedStyle</div>
        <div id=showStyle style="display:none">
          <input autocomplete="off" type="search" id="search" placeholder="Search for a property or value" />
          <ul id="results"></ul>
        </div>

      `;
      this.label.style = `display: block; top:${e.clientY + 20}px; left:${e.clientX + 20}px;`;
      dragElement(this.label)
    } else {
      this.label.style = 'display: none;';
    }
  }


  inject_label_style() {
    const style = document.createElement('div');
    style.innerHTML = `
    <style>
      .debucsser-label {
        position: fixed; 
        font-family: Tahoma, Verdana;
        background: #333; 
        border: 1px solid #c678dd;
        border-radius: 5px;
        color: #abb2bf; 
        z-index: 999;
        transition: 0s;
      }
      #results span,
      .debucsser-label label {
        display:inline;
        color: #c678dd;
        font-weight: normal;
      }
      .debucsser-label span,
      .debucsser-label div {
        padding: .2em .5em; 
      }
      .topper{
        background:#c678dd;
        color: #333;
      }
      .ghlogo {
        position: relative;
        left: -10px;
        cursor:pointer;
      }
      #closedebu::before{
        float: right;
        content: "\\2716";
        color: #8b0000;
        cursor:pointer;
      }
      #closedebu:hover::before{
        color:red;  
      }
      #getStyle{
        cursor: pointer;
        padding: .7em .5em ;
      }
      #dragheader{
        cursor: move;
        position:relative;
        right:-20px;
      }
      #results{
        height: 300px;
        overflow-y: scroll;
      }
      #results li{
        max-width: 500px;
      }
      #showStyle input{
        width: 300px;
      }
    </style>`;
    document.body.appendChild(style);
  }
}

// init Debucsser
const config = {
    // color: 'palevioletred',
    grayscaleOnDebug: true,
    }
const debug = new Debucsser(config).init();

 


document.addEventListener('click', (element) => {
    // deb(element.target.classList[0])
    // deb(element.target.innerText)
    if(element.target.id == 'getStyle'){
    // deb(dumpCSSText(element.target))
    document.getElementById('showStyle').style.display = 'block';
    searchInStyle(dumpCSSText(element.target))
    };

    if(element.target.classList[0] == 'copy'){
      navigator.clipboard.writeText(element.target.innerText).then(function() {
        createTooltip(element, "Copied to Clipboard: "+element.target.innerText)
      }, function(err) {
        createTooltip(element, "Could not copy text: "+element.target.innerText)
        console.error('Async: Could not copy text: ', err);
      });
    };
});





function dragElement(elmnt) {
  // deb(elmnt)
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  document.getElementById("dragheader").onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = pos4+"px"// (elmnt.offsetTop - pos2 * 2) + "px";
    elmnt.style.left = pos3+"px"//(elmnt.offsetLeft - pos1 + 2) + "px";
    // deb(elmnt.style.top,'elmnt.style.top')
    // deb(pos2,'pos2')
    // deb(pos4,'pos4')
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}









// https://codepen.io/rebelchris/pen/WNxzmeY?editors=1010
function searchInStyle(data){
  const search = document.getElementById("search");
  const results = document.getElementById("results");
  let search_term = "";
  const showList = () => {
    results.innerHTML = "";
    data
      .filter((item) => {
          // deb(item.key)
        return (
          item.key.toLowerCase().includes(search_term) ||
          item.value.toLowerCase().includes(search_term)
        );
      })
      .forEach((e) => {
        const li = document.createElement("li");
        li.innerHTML = `<i class=copy>${e.key}</i>: <span class=copy> ${e.value}</span>`;
        results.appendChild(li);
      });
  };
  showList();
  search.addEventListener("input", (event) => {
    deb(event)
    search_term = event.target.value.toLowerCase();
    showList();
  });
}



function dumpCSSText(element){
  const obj =[];
  const o = getComputedStyle(element);
  for(let i = 0; i < o.length; i++){
    obj.push({ 'key': o[i], 'value': o.getPropertyValue(o[i]) });
  }
  return obj;
} 



function createTooltip(e,v) {
    // deb(e)
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.zIndex = '999';
    tooltip.style.background = '#222';
    tooltip.style.color = '#bbb';
    tooltip.style.padding = '.5em';
    tooltip.innerHTML = v;
    x = (e.pageX ? e.pageX : window.event.x); 
    y = (e.pageY ? e.pageY : window.event.y);
    tooltip.style.left = (x - 20) + "px";
    tooltip.style.top 	= (y - 40) + "px";
    document.body.appendChild(tooltip);
    setTimeout(function(){tooltip.remove(); }, 1000);
}