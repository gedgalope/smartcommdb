
import SmartRSLForm from '~/components/smart/smartRSLForm.vue'

export default {
  name: 'SmartEditingCard',
  data() {
    return {
      cardHeight : window.innerHeight,
      showBlankForm:false,
      folderNumber:null,
      ORNumber:null,
      ORDate:null,
      amount:null,
      transType:'renewal',
    }
  },
  components:{
    'smart-rsl-form':SmartRSLForm
  }
}