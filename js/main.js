/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
;(function(window) {

	/**
	 * FolderFx obj.
	 */
	function FolderFx(el) {
		this.DOM = {};
		this.DOM.el = el;
		this.DOM.wrapper = this.DOM.el.querySelector('.folder__icon');
		this.DOM.back = this.DOM.wrapper.querySelector('.folder__icon-img--back');
		this.DOM.cover = this.DOM.wrapper.querySelector('.folder__icon-img--cover');
		this.DOM.feedback = this.DOM.el.querySelector('.folder__feedback');
		this.DOM.preview = this.DOM.el.querySelector('.folder__preview');
		this.DOM.previewElems = this.DOM.preview.children;
		this.totalPreview = this.DOM.previewElems.length;

		this._initEvents();
	}

	/**
	 * Remove/Stop any animation.
	 */
	FolderFx.prototype._removeAnimeTargets = function() {
		anime.remove(this.DOM.preview);
		anime.remove(this.DOM.previewElems);
		anime.remove(this.DOM.wrapper);
		anime.remove(this.DOM.cover);
		anime.remove(this.DOM.el);
		if( this.DOM.feedback ) {
			anime.remove(this.DOM.feedback);
			this.DOM.feedback.style.opacity = 0;
		}
		if( this.DOM.letters ) {
			anime.remove(this.DOM.letters);
		}
	};

	FolderFx.prototype._initEvents = function() {
		const self = this;
		this._mouseenterFn = function() {
			self.intimeout = setTimeout(function() {
				self._removeAnimeTargets();
				self._in();
			}, 75);
		};
		this._mouseleaveFn = function() {
			clearTimeout(self.intimeout);
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.wrapper.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.wrapper.addEventListener('mouseleave', this._mouseleaveFn);
	};

	FolderFx.prototype._in = function() {
		const self = this;
		[].slice.call(this.DOM.previewElems).forEach(function(el) {
			// Add default behaviour.
			//el.style.opacity = 1;
		});
	};

	FolderFx.prototype._out = function() {
		const self = this;
		[].slice.call(this.DOM.previewElems).forEach(function(el) {
			// Add default behaviour.
			//el.style.opacity = 0;
		});
	};

	/************************************************************************
	 * 1: DeviFx.
	 ************************************************************************/
	function DeviFx(el) {
		FolderFx.call(this, el);
	}

	DeviFx.prototype = Object.create(FolderFx.prototype);
	DeviFx.prototype.constructor = DeviFx;
	
	DeviFx.prototype._in = function() {
		const self = this;

		anime({
			targets: this.DOM.previewElems,
			duration: 600,
			delay: function(t, i, c) {
				return (c-i-1)*40;
			},
			easing: [0.2,1,0.3,1],
			translateY: function(t, i, c) {
				const radius = 150,
					  startAngle = Math.PI / c,
					  angle = startAngle/2 + startAngle*i;

				return Math.round(-1*radius*Math.sin(angle)) + 'px';
			},
			translateX: function(t, i, c) {
				const radius = 150,
					  startAngle = Math.PI / c,
					  angle = startAngle/2 + startAngle*i;

				return Math.round(radius*Math.cos(angle)) + 'px';
			},
			scale: [0.7,1],
			opacity: {
				value: 1,
				duration: 10,
				easing: 'linear'
			}
		});
	};

	DeviFx.prototype._out = function() {
		const self = this;

		anime({
			targets: this.DOM.previewElems,
			duration: 600,
			delay: function(t, i, c) {
				return (c-i-1)*40;
			},
			easing: [0.2,1,0.3,1],
			translateY: 0,
			translateX: 0,
			scale: [1,0.7],
			opacity: {
				value: 0,
				duration: 10,
				delay: function(t, i, c) {
					return (c-i-1)*40+600;
				},
				easing: 'linear'
			}
		});
	};

	window.DeviFx = DeviFx;
	
	/************************************************************************
	 * 2: RudrasFx.
	 ************************************************************************/
	
	function RudrasFx(el) {
		FolderFx.call(this, el);
	}

	RudrasFx.prototype = Object.create(FolderFx.prototype);
	RudrasFx.prototype.constructor = RudrasFx;
	
	RudrasFx.prototype._in = function() {
		const self = this;

		anime({
			targets: this.DOM.previewElems,
			duration: 800,
			delay: function(t, i, c) {
				return (c-i-1)*80;
			},
			easing: 'easeOutElastic',
			translateY: function(t, i, c) {
				const radius = 130,
					  startAngle = Math.PI / c,
    				  angle = startAngle/2 + startAngle*i;

    			return Math.round(-1*radius*Math.sin(angle)) + 'px';
			},
			translateX: function(t, i, c) {
				const radius = 130,
					  startAngle = Math.PI / c,
    				  angle = startAngle/2 + startAngle*i;

    		    return Math.round(-1*radius*Math.cos(angle)) + 'px';
			},
			scale: [0,1],
			opacity: {
				value: 1,
				duration: 10,
				easing: 'linear'
			}
		});

		anime({
			targets: this.DOM.cover,
			duration: 300,
			easing: 'easeOutExpo',
			rotateX: [0,-30]
		});
	};

	RudrasFx.prototype._out = function() {
		const self = this;

		anime({
			targets: this.DOM.previewElems,
			duration: 300,
			delay: function(t, i, c) {
				return i*40;
			},
			easing: 'easeInBack',
			translateY: 0,
			translateX: 0,
			scale: [1,0],
			opacity: {
				value: 0,
				duration: 10,
				delay: function(t, i, c) {
					return i*40+300;
				},
				easing: 'linear'
			}
		});

		anime({
			targets: this.DOM.cover,
			duration: 500,
			delay: (this.totalPreview-1)*40+200,
			easing: 'easeOutExpo',
			rotateX: 0
		});
	};

	window.RudrasFx = RudrasFx;

	/************************************************************************
	 * 3: ArdraFx.
	 ************************************************************************/
	
	function ArdraFx(el) {
		FolderFx.call(this, el);
	}

	ArdraFx.prototype = Object.create(FolderFx.prototype);
	ArdraFx.prototype.constructor = ArdraFx;
	
	ArdraFx.prototype._in = function() {
		const self = this;

		anime({
			targets: this.DOM.previewElems,
			duration: 500,
			easing: [0.1,1,0.3,1],
			translateY: function(t, i, c) {
				const radius = anime.random(110,160);
				return Math.round(radius * Math.sin(2*(i+1)*Math.PI/c)) + 'px';
			},
			translateX: function(t, i, c) {
				const radius = anime.random(110,160);
				return Math.round(radius * Math.cos(2*(i+1)*Math.PI/c)) + 'px';
			},
			rotate: function(t, i, c) {
				return [0,anime.random(-3,3) + 'deg'];
			},
			scale: [0.4,1],
			opacity: {
				value: 1,
				duration: 10,
				easing: 'linear'
			}
		});

		anime({
			targets: this.DOM.wrapper,
			duration: 500,
			easing: [0.1,1,0.3,1],
			scale: [1,0.8]
		});

		anime({
			targets: this.DOM.feedback,
			easing: [0.1,1,0.3,1],
			opacity: [
				{ 
					value:1, 
					duration:10
				},
				{ 
					value:0, 
					duration:400, 
					delay:50 
				}
			],
			scale: {
				value: [1,10],
				duration: 900
			}
		});
	};

	ArdraFx.prototype._out = function() {
		const self = this;

		anime({
			targets: this.DOM.previewElems,
			duration: 500,
			easing: [0.1,1,0.3,1],
			translateY: 0,
			translateX: 0,
			rotate: 0,
			scale: [1,0.4],
			opacity: {
				value: 0,
				duration: 250,
				delay: 250,
				easing: 'linear'
			}
		});

		anime({
			targets: this.DOM.wrapper,
			duration: 500,
			easing: [0.1,1,0.3,1],
			scale: [0.8,1]
		});
	};

	window.ArdraFx = ArdraFx;

	/************************************************************************
	 * 4: ShaktiFx.
	 ************************************************************************/
	
	function ShaktiFx(el) {
		FolderFx.call(this, el);
	}

	ShaktiFx.prototype = Object.create(FolderFx.prototype);
	ShaktiFx.prototype.constructor = ShaktiFx;
	
	ShaktiFx.prototype._in = function() {
		const self = this;

		anime({
			targets: this.DOM.previewElems,
			duration: 500,
			delay: function(t, i, c) {
				return i*80;
			},
			easing: [0.1,1,0.3,1],
			rotate: function(t, i,c) { 
				return [0,-10*(c-i-1) - 15 + 'deg']; 
			},
			opacity: {
				value: 1,
				duration: 10,
				delay: function(t, i, c) {
					return i*80 + 10;
				},
				easing: 'linear'
			}
		});

		anime({
			targets: this.DOM.el,
			duration: 400,
			easing: [0.2,1,0.3,1],
			translateY: [0,15+'px']
		});
	};

	ShaktiFx.prototype._out = function() {
		const self = this;

		anime({
			targets: this.DOM.previewElems,
			duration: 500,
			easing: [0.1,1,0.3,1],
			rotate: 0,
			opacity: {
				value: 0,
				duration: 20,
				delay: 80,
				easing: 'linear'
			}
		});

		anime({
			targets: this.DOM.el,
			duration: 400,
			easing: [0.2,1,0.3,1],
			translateY: 0
		});
	};

	window.ShaktiFx = ShaktiFx;

	/************************************************************************
	 * 5: KuberaFx.
	 ************************************************************************/
	
	function KuberaFx(el) {
		FolderFx.call(this, el);
	}

	KuberaFx.prototype = Object.create(FolderFx.prototype);
	KuberaFx.prototype.constructor = KuberaFx;
	
	KuberaFx.prototype._in = function() {
		const self = this;

		anime({
			targets: this.DOM.previewElems,
			duration: 400,
			easing: 'linear',
			delay: function(t, i, c) {
				return i*300;
			},
			translateY: function(t, i, c) {
				return -1*anime.random(180,250) + 'px';
			},
			translateX: function(t, i, c) {
				return anime.random(-25,25) + 'px';
			},
			rotate: function(t, i) {
				return anime.random(-20,20) + 'deg';
			},
			opacity: [
				{ 
					value:1, 
					duration:10
				},
				{ 
					value:0, 
					duration:200, 
					delay:200 
				}
			],
			loop: true
		});

		anime({
			targets: this.DOM.cover,
			duration: 400,
			easing: 'easeOutExpo',
			rotateX: [0,-40]
		});
	};

	KuberaFx.prototype._out = function() {
		const self = this;

		anime({
			targets: this.DOM.previewElems,
			duration: 100,
			easing: 'linear',
			rotate: 0,
			opacity: 0
		});

		anime({
			targets: this.DOM.cover,
			duration: 300,
			easing: 'easeOutExpo',
			rotateX: 0
		});
	};

	window.KuberaFx = KuberaFx;

	/************************************************************************
	 * 6: HariFx.
	 ************************************************************************/
	
	function HariFx(el) {
		FolderFx.call(this, el);
	}

	HariFx.prototype = Object.create(FolderFx.prototype);
	HariFx.prototype.constructor = HariFx;
	
	HariFx.prototype._in = function() {
		const self = this,
			firstStepDuration = 200;

		anime({
			targets: this.DOM.previewElems,
			duration: 800,
			delay: firstStepDuration,
			easing: 'easeOutElastic',
			elasticity: 400,
			translateY: function(t, i, c) {
				const radius = 140,
					  startAngle = Math.PI / c,
					  angle = startAngle/2 + startAngle*i;

				return Math.round(radius*Math.sin(angle)) + 'px';
			},
			translateX: function(t, i, c) {
				const radius = 140,
					  startAngle = Math.PI / c,
					  angle = startAngle/2 + startAngle*i;

				return Math.round(radius*Math.cos(angle)) + 'px';
			},
			scale: [0.5,1],
			opacity: {
				value: 1,
				duration: 10,
				easing: 'linear'
			}
		});

		anime({
			targets: this.DOM.wrapper,
			translateY: [
				{ 
					value: -20 + 'px', 
					duration: 800, 
					delay: firstStepDuration, 
					elasticity: 300 
				},
			],
			scaleY: [
				{ 
					value: 0.8, 
					duration: firstStepDuration, 
					easing: 'easeOutExpo' 
				},
				{ 
					value: .9, 
					duration: 800, 
					elasticity: 300 
				}
			],
			scaleX: [
				{ 
					value: 1.1, 
					duration: firstStepDuration, 
					easing: 'easeOutExpo' 
				},
				{ 
					value: .9, 
					duration: 800, 
					elasticity: 300 
				}
			]
		});

		anime({
			targets: this.DOM.cover,
			duration: 400,
			delay: firstStepDuration,
			easing: 'easeOutExpo',
			rotateX: [0,-25]
		});

		anime({
			targets: this.DOM.feedback,
			delay: firstStepDuration,
			easing: [0.1,1,0.3,1],
			opacity: [
				{ 
					value:1, 
					duration:10
				},
				{ 
					value:0, 
					duration:700, 
					delay:50 
				}
			],
			scale: {
				value: [1,15],
				duration: 1100
			}
		});
	};

	HariFx.prototype._out = function() {
		const self = this;

		anime({
			targets: this.DOM.previewElems,
			duration: 400,
			easing: 'easeOutExpo',
			translateY: 0,
			translateX: 0,
			scale: [1,0.5],
			opacity: {
				value: 0,
				duration: 10,
				delay: 400,
				easing: 'linear'
			}
		});

		anime({
			targets: this.DOM.wrapper,
			duration: 400,
			easing: 'easeOutExpo',
			translateY: 0,
			scaleY: 1,
			scaleX: 1
		});

		anime({
			targets: this.DOM.cover,
			duration: 400,
			easing: 'easeOutExpo',
			rotateX: 0
		});
	};

	window.HariFx = HariFx;

	/************************************************************************
	 * 7: RaviFx.
	 ************************************************************************/
	
	function RaviFx(el) {
		FolderFx.call(this, el);
	}

	RaviFx.prototype = Object.create(FolderFx.prototype);
	RaviFx.prototype.constructor = RaviFx;
	
	RaviFx.prototype._in = function() {
		const self = this;

		anime({
			targets: this._reorder(this.DOM.previewElems),
			duration: 400,
			easing: [0.1,1,0.3,1],
			translateY: -70,
			translateX: function(t, i, c) {
				const interval = 60;
				return -1*interval*Math.floor(c/2)+interval*i  + (c/2 %1 != 0 ? 0 : interval/2) + 'px';
			},
			rotate: function(t, i, c) {
				const interval = 20;
				return -1*interval*Math.floor(c/2)+interval*i  + (c/2 %1 != 0 ? 0 : interval/2) + 'deg';
			},
			opacity: {
				value: 1,
				duration: 10,
				easing: 'linear'
			}
		});

		anime({
			targets: this.DOM.cover,
			duration: 400,
			easing: 'easeOutExpo',
			rotateX: [0,-30]
		});
	};

	RaviFx.prototype._out = function() {
		const self = this;

		anime({
			targets: this.DOM.previewElems,
			duration: 300,
			easing: 'easeInBack',
			translateY: 0,
			translateX: 0,
			rotate: 0,
			scale: [1,0.5],
			opacity: {
				value: 0,
				duration: 10,
				delay: 300,
				easing: 'linear'
			}
		});

		anime({
			targets: this.DOM.cover,
			duration: 300,
			delay: 300,
			easing: 'easeOutExpo',
			rotateX: 0
		});

		anime({
			targets: this.DOM.feedback,
			delay: 350,
			easing: [0.1,1,0.3,1],
			opacity: [
				{ 
					value:1, 
					duration:10
				},
				{ 
					value:0, 
					duration:500, 
					delay:20 
				}
			],
			scale: {
				value: [1,5],
				duration: 800
			}
		});
	};

	RaviFx.prototype._reorder = function(arr) {
		let newArray = [],
			i = Math.ceil(arr.length/2),
			j = i - 1;

		while (j >= 0) {
			newArray.push(arr[j--]);
			if (i < arr.length) {
				newArray.push(arr[i++]);
			}
		}
		return newArray;
	}

	window.RaviFx = RaviFx;

	/************************************************************************
	 * 8: DurgaFx.
	 ************************************************************************/
	
	function DurgaFx(el) {
		FolderFx.call(this, el);

		// Create spans for each letter (preview elements).
		[].slice.call(this.DOM.previewElems).forEach(function(el) {
			charming(el);
		});
		this.DOM.letters = [].slice.call(this.DOM.preview.querySelectorAll('span'));
	}

	DurgaFx.prototype = Object.create(FolderFx.prototype);
	DurgaFx.prototype.constructor = DurgaFx;
	
	DurgaFx.prototype._in = function() {
		const self = this;

		anime({
			targets: this.DOM.letters,
			duration: 20,
			delay: function(t, i) {
				return i*20;
			},
			easing: 'linear',
			opacity: [0,1],
			begin: function() {
				self.DOM.preview.style.opacity = 1;
			}
		});

		anime({
			targets: this.DOM.cover,
			duration: 300,
			easing: 'easeOutExpo',
			rotateX: [0,-30]
		});
	};

	DurgaFx.prototype._out = function() {
		this.DOM.preview.style.opacity = 0;

		anime({
			targets: this.DOM.cover,
			duration: 300,
			easing: 'easeOutExpo',
			rotateX: 0
		});
	};	

	window.DurgaFx = DurgaFx;

	/************************************************************************
	 * 9: NandiFx.
	 ************************************************************************/
	
	function NandiFx(el) {
		FolderFx.call(this, el);
	}

	NandiFx.prototype = Object.create(FolderFx.prototype);
	NandiFx.prototype.constructor = NandiFx;
	
	NandiFx.prototype._in = function() {
		const self = this;

		anime({
			targets: this.DOM.preview,
			duration: 300,
			easing: 'easeOutExpo',
			scale: {
				value: [0,1],
				easing: 'easeInOutSine'
			},
			translateY: {
				value: [0,-200]
			},
			opacity: {
				value: 1,
				duration: 50,
				easing: 'linear'
			}
		});

		anime({
			targets: this.DOM.previewElems,
			duration: 400,
			delay: function(t, i) {
				return i*40 + 200;
			},
			easing: [0.1,1,0.3,1],
			scale: [0,1]
		});

		anime({
			targets: this.DOM.cover,
			duration: 300,
			easing: [0.1,1,0.3,1],
			rotateX: [0,-30]
		});
	};

	NandiFx.prototype._out = function() {
		anime({
			targets: this.DOM.preview,
			duration: 500,
			easing: 'easeInOutSine',
			scale: {
				value: [1,0],
				easing: 'easeOutExpo'
			},
			translateY: 0,
			opacity: {
				value: 0,
				duration: 50,
				delay: 200,
				easing: 'linear'
			}
		});

		anime({
			targets: this.DOM.previewElems,
			duration: 100,
			easing: 'easeOutQuad',
			scale: 0
		});

		anime({
			targets: this.DOM.cover,
			duration: 600,
			delay: 100,
			easing: 'linear',
			rotateX: 0
		});
	};

	window.NandiFx = NandiFx;

})(window);