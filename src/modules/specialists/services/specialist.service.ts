import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { SpecialistRepository } from '../repo/specialist/repository';
import { BidFormInterface } from '@/modules/bids/types/bid';
import questions from '@/static/questions.json';

@Injectable()
export class SpecialistService {
  constructor(
    @Inject('ISpecialistRepository')
    private readonly specialistRepo: SpecialistRepository,
  ) {}

  async getAll() {
    try {
      const specialists = await this.specialistRepo.getAll({
        email: 0,
        created_at: 0,
        updated_at: 0,
      });
      return specialists;
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }

  async getByFilterBid(form: BidFormInterface[]) {
    try {
      let allSpecialists = await this.specialistRepo.getAll({
        email: 0,
        created_at: 0,
        updated_at: 0,
      });
      let specialists = allSpecialists.map((el) => ({
        ...el,
        methods: el.methods.map((subEl) => subEl.name),
      }));
      const allSpecCount = specialists.length;

      const filteredWithField = form.filter((el) => el.field.length > 0);

      for (let index = 0; index < filteredWithField.length; index++) {
        const filter = filteredWithField[index];
        const numberFields = ['age', 'price', 'experience_years'];
        const singleFields = [
          'gender',
          'age',
          'religion',
          'experience_route',
          'experience_ethnic_group',
        ];
        const methodFields = ['method'];

        if (numberFields.includes(filter.field)) {
          let filterValue = filter.answer[0].toLowerCase();
          let modelValue: number[];

          if (/\d/.test(filterValue)) {
            const cleaned = filterValue.replace('–', '-');
            modelValue = cleaned.match(/\d+/g)?.map(Number) ?? [];
            if (modelValue.length === 1) {
              modelValue.push(999999);
            }
          } else {
            modelValue = [];
          }

          if (modelValue.length > 0) {
            specialists = specialists.filter(
              (el) =>
                el[filter.field] >= modelValue[0] &&
                el[filter.field] <= modelValue[1],
            );
          }
        }

        if (singleFields.includes(filter.field)) {
          let filterValue = filter.answer[0].toLowerCase();
          let modelValue: string;

          switch (filterValue) {
            case 'женщина':
              modelValue = 'female';
              break;
            case 'мужчина':
              modelValue = 'male';
              break;
            case 'неважно':
              modelValue = '';
              break;
            case 'христианство':
              modelValue = 'christianity';
              break;
            case 'ислам':
              modelValue = 'islam';
              break;
            case 'буддизм':
              modelValue = 'buddhism';
              break;
            case 'иудаизм':
              modelValue = 'judaism';
              break;
            case 'да':
              modelValue = 'yes';
              break;
            case 'нет':
              modelValue = 'no';
              break;
            case 'для себя':
              modelValue = 'adult';
              break;
            case 'для ребенка':
              modelValue = 'child';
              break;
            case 'пары':
              modelValue = 'couple';
              break;
            case 'супервизии':
              modelValue = 'supervision';
              break;
            default:
              modelValue = '';
              break;
          }

          if (modelValue) {
            specialists = specialists.filter((el) => {
              if (Array.isArray(el[filter.field])) {
                return el[filter.field].includes(modelValue);
              } else if (typeof el[filter.field] === 'string') {
                return el[filter.field] === modelValue;
              }
            });
          }
        }

        if (methodFields.includes(filter.field)) {
          if (filter.answer.length > 0) {
            specialists = specialists.filter((el) =>
              el.methods.some((subEl) => filter.answer.includes(subEl)),
            );
          }
        }
      }

      const specCount = specialists.length;

      return specialists;
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }
}
