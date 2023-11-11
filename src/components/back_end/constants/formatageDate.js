import {format} from 'date-fns';
import { fr } from 'date-fns/locale';

const FormatageDate = (date) =>{
  return  format(new Date(date), 'dd MMMM yyyy', { locale: fr });
}

export default FormatageDate;