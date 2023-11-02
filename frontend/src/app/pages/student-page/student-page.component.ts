import { Component } from '@angular/core';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.sass']
})
export class StudentPageComponent {
  activities = [
    {
      title: 'Великий басейн',
      iconImgSrc: '../../../assets/img/student-page-img/icon1.jpg',
      imageSrc: '../../../assets/img/student-page-img/img2.jpg',
      description: 'У великому басейні КПІ проводяться заняття з плавання, аквааеробіки, дайвінгу, водного поло, каякінгу. Для відвідування необхідно мати довідку від терапевта з дозволом відвідувати басейн.',
      link: 'https://kpi.ua/swimming-pool'
    },
    {
      title: 'Автошкола КПІ',
      iconImgSrc: '../../../assets/img/student-page-img/icon2.jpg',
      imageSrc: '../../../assets/img/student-page-img/img3.jpg',
      description: 'Студенти, викладачі та співробітники КПІ ім. Ігоря Сікорського зможуть навчитися водити автомобіль, підготуватися до складання іспитів на отримання водійських прав та отримати необхідний супровід під час такого складання безпосередньо в університеті.',
      link: 'https://kpi.ua/autoschool'
    },
    {
      title: 'Бібліотека',
      iconImgSrc: '../../../assets/img/student-page-img/icon3.jpg',
      imageSrc: '../../../assets/img/student-page-img/img4.jpg',
      description: 'Бібліотека КПІ - інтелектуальна, комунікаційна, інноваційна відкрита платформа; надійний партнер університетської та фахової спільноти у розвитку освітньо-наукового середовища.',
      link: 'https://www.library.kpi.ua/'
    },
    {
      title: 'Вежа КПІ',
      iconImgSrc: '../../../assets/img/student-page-img/icon4.jpg',
      imageSrc: '../../../assets/img/student-page-img/img5.jpg',
      description: '17 квітня гостинно відчинила свої двері оновлена вежа корпусу № 1 Національного технічного університету України «Київський політехнічний інститут». Відтепер тут відкрито галерею Арт-простір «Вежа КПІ», в якій експонуватимуться художні твори студентів-політехніків.',
      link: 'https://kpi.ua/vezha-open'
    }
  ];
}
