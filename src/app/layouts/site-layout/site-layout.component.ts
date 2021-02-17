import {Component, ElementRef, HostListener, Inject, NgZone, OnInit, Renderer2, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {NgForm} from '@angular/forms';
import {Point} from '../../point/point';
import {AuthService} from '../../services/auth.service';
import {TablePoint} from '../../tablePoint/tablePoint';
import {Router} from '@angular/router';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {

  @ViewChild('someInput') someInput: ElementRef;
  private point: Point;
  answer: string;
  done: boolean = false;
  x: number = 2;
  y: number = 2;
  r: number = 1;
  result: string;
  pointsList: TablePoint[];
  @ViewChild('svvg') d1: ElementRef;

  constructor(private auth: AuthService,
              private zone: NgZone,
              @Inject(Router) private router: Router) { }

  ngOnInit(): void {


    if (localStorage.getItem('auth-login') !== null && localStorage.getItem('auth-login') !== undefined) {
      this.auth.getPoints().subscribe(
        data => {
          this.pointsList = data;
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  refresh() {
    this.auth.getPoints().subscribe(
      data => {
        this.pointsList = data;
      }
    );
  }

  handleChange(e) {
    if (this.r !== undefined && this.r > 0) {
      this.done = false;
      const svgDiagram = $('#svgDiagram');
      svgDiagram.remove();
      const svg = $('#diagram');
      svg.append( `<svg class="svvg" #svvg id="svgDiagram" xmlns="http://www.w3.org/2000/svg" width="300" height="300">
      <line x1="0" y1="150" x2="300" y2="150" stroke="#000000"></line>
      <line x1="150" y1="0" x2="150" y2="300" stroke="#000000"></line>

      <line x1="250" y1="145" x2="250" y2="155" stroke="#000000"></line>
      <line x1="200" y1="145" x2="200" y2="155" stroke="#000000"></line>
      <line x1="100" y1="145" x2="100" y2="155" stroke="#000000"></line>
      <line x1="50" y1="145" x2="50" y2="155" stroke="#000000"></line>

      <line x1="145" y1="50" x2="155" y2="50" stroke="#000000"></line>
      <line x1="145" y1="100" x2="155" y2="100" stroke="#000000"></line>
      <line x1="145" y1="200" x2="155" y2="200" stroke="#000000"></line>
      <line x1="145" y1="250" x2="155" y2="250" stroke="#000000"></line>

      <text x="245" y="140" stroke="#000000">${this.r}</text>
      <text x="185" y="140" stroke="#000000">${(this.r) / 2}</text>
      <text x="77" y="140" stroke="#000000">-${(this.r) / 2}</text>
      <text x="37" y="140" stroke="#000000">-${this.r}</text>
      <text x="156" y="55" stroke="#000000">${this.r}</text>
      <text x="156" y="105" stroke="#000000">${(this.r) / 2}</text>
      <text x="156" y="205" stroke="#000000">-${(this.r) / 2}</text>
      <text x="156" y="255" stroke="#000000">-${this.r}</text>
      <polygon points="300,150 295,155 295, 145" fill="#000720" stroke="#000000"></polygon>
      <polygon points="150,0 145,5 155,5" fill="#000720" stroke="#000000"></polygon>

      <rect x="150" y="100" width="100" height="50" fill-opacity="0.4" stroke="navy" fill="blue"></rect>
      <polygon points="150,150 100,150 150,200" fill-opacity="0.4" stroke="navy" fill="blue"></polygon>
      <path d="M150 150 L 250 150 C 250 150 250 250 150 250 L Z" fill-opacity="0.4" stroke="navy" fill="blue"></path>
      </svg>`);
    } else {
      this.done = true;
      this.answer = 'R must be bigger than 0.';
    }
  }

  onClick(e) {
    if (this.r !== undefined && this.r > 0) {
      this.done = false;
      const svg = $('svg');
      const offset = $('.svvg').offset();
      const relativeX = (e.pageX - offset.left) ;
      const relativeY = (e.pageY - offset.top);
      const basis = 100 / this.r;
      // tslint:disable-next-line:variable-name
      const x_val = ((relativeX - 150 ) / basis).toFixed(2);
      // tslint:disable-next-line:variable-name
      const y_val = ((150 - relativeY) / basis).toFixed(2);


      this.point = new Point();
      this.point.x = +x_val;
      this.point.y = +y_val;
      this.point.r = this.r;

      this.auth.addPoint(this.point).subscribe(
        (result) => {
          if (result.result == 'true') {
            this.d1.nativeElement.insertAdjacentHTML('beforeend', `<circle r="3" cx="${relativeX}" cy="${relativeY}" fill-opacity="0.7" fill="${'green'}"></circle>`);

            //  this.d1.nativeElement += `<circle r="3" cx="${relativeX}" cy="${relativeY}" fill-opacity="0.7" fill="${'green'}"></circle>`;
            const svgDiagram = $('#svgDiagram');
            svgDiagram.remove();
            const ssvg = $('#diagram');
            ssvg.append(this.d1.nativeElement);


            this.auth.getPoints().subscribe(
              data => {
                this.pointsList = data;
              }
            );
          } else {
            this.d1.nativeElement.insertAdjacentHTML('beforeend', `<circle r="3" cx="${relativeX}" cy="${relativeY}" fill-opacity="0.7" fill="${'red'}"></circle>`);
            const svgDiagram = $('#svgDiagram');
            svgDiagram.remove();
            const ssvg = $('#diagram');
            ssvg.append(this.d1.nativeElement);

            this.auth.getPoints().subscribe(
              data => {
                this.pointsList = data;
              }
            );
          }
        },
        error => {
          console.log('ошибка site-layout  ');
        },
        () => console.log('complete site-layout')
      );
      // tslint:disable-next-line:max-line-length
    } else {
      this.done = true;
      this.answer = 'R must be bigger than 0.';
    }
  }


  onSubmit(form: NgForm) {
    if (this.r !== undefined && this.r > 0) {
      this.done = false;
      this.point = new Point();
      this.point.x = this.x;
      this.point.y = this.y;
      this.point.r = this.r;
      console.log('x =' + this.point.x);
      console.log('y =' + this.point.y);
      console.log('r =' + this.point.r);

      this.auth.addPoint(this.point).subscribe(
        (result) => {
          let relativeX = this.x * 100 / this.r + 150;
          let relativeY = 150 - this.y * 100 / this.r;

          if (result.result == 'true') {
            this.d1.nativeElement.insertAdjacentHTML('beforeend', `<circle r="3" cx="${relativeX}" cy="${relativeY}" fill-opacity="0.7" fill="${'green'}"></circle>`);
          } else {
            this.d1.nativeElement.insertAdjacentHTML('beforeend', `<circle r="3" cx="${relativeX}" cy="${relativeY}" fill-opacity="0.7" fill="${'red'}"></circle>`);
          }
          const svgDiagram = $('#svgDiagram');
          svgDiagram.remove();
          const ssvg = $('#diagram');
          ssvg.append(this.d1.nativeElement);

          this.auth.getPoints().subscribe(
            data => {
              this.pointsList = data;
              console.log(data);
            }
          );
        }
      );
    } else {
      this.done = true;
      this.answer = 'R must be bigger than 0.';
    }
  }

  setResult(result: string) {
    this.result = result;
  }

  logout() {
    this.auth.logout();
  }
}

