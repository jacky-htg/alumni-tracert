<script>
  import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb'
  import { Images } from '../helper/images'
  import { QuestionGroupListInput, QuestionGroupList } from '../../proto/question_group_message_pb'
  import { UserAnswer } from '../../proto/user_answer_message_pb'
  import QuestionService from '../services/question'
  import { onMount } from 'svelte'
  import { notifications } from '../helper/toast'
  import { navigate } from 'svelte-routing'
  import { PATH_URL } from '../helper/path'
  import UserAnswerService from '../services/user_answer'
  import Cookies from 'js-cookie'
  
  let groups  = [1];
  const userAnswer = [];
  
  const questionGroupListInputProto = new QuestionGroupListInput()
  let questionList = new QuestionGroupList()
  
  async function questionListCall(){
    var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			}
		}
    questionGroupListInputProto.setQuestionGroupIdList(groups)
    const question = new QuestionService(deps, questionGroupListInputProto)
    return await question.list()
	}

  async function userAnswerCall(){
    var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			}
		}

    const userId = Cookies.get('userid')
    
    let promises = [];
    userAnswer.forEach((answer, questionId) => {
      const userAnswerProto = new UserAnswer()
      userAnswerProto.setUserId(userId)
      userAnswerProto.setQuestionId(questionId)
      userAnswerProto.setAnswer(JSON.stringify(answer))

      const userAnswerService = new UserAnswerService(deps, userAnswerProto)
      promises.push(userAnswerService.answer())
    })

    return Promise.all(promises)
	}

  onMount(async () => {
		try {
      questionList = await questionListCall()
    } catch(e) {
      notifications.danger(e.message)
    }
	})

  const changeAnswer = (event, questionId, isMultiple) => {
    console.log(userAnswer)
    console.log(`questionList.getQuestionGroupList()`, questionList.getQuestionGroupList())
    if (isMultiple) {
      if (!userAnswer[questionId]) {
        let temp = [];
        temp.push(event.target.value)
        userAnswer[questionId] = temp;
      } else {
        let temp = userAnswer[questionId];
        let value = event.target.value;
        let isChecked = event.target.checked;
        if (temp.indexOf(value) === -1) {
          temp.push(value);
        } else {
          temp.splice(temp.indexOf(value), 1);
        }
        userAnswer[questionId] = temp;
      }
    } else {
      console.log(questionId, event.target.value)
      userAnswer[questionId] = event.target.value
    }
    console.log(`userAnswer`, userAnswer)
  }

  const validateAnswer = () => {
    let result = true;
    questionList.getQuestionGroupList().forEach(group => {
      console.log(`group`, group)
      group.getQuestionList().forEach(question => {
        console.log(question.getId(), userAnswer[question.getId()])
        if(!userAnswer[question.getId()]) {
          result = false
        } 
      })
    })
    return result
  }

  const lanjutkan = async () => {
    try {
      if (!validateAnswer()) {
        console.log(`userAnswer`, userAnswer)
        throw { message: "silahkan jawab kuisioner terlebih dahulu"}
      } 

      const answer = await userAnswerCall()

      if (groups.length === 1 && groups[0] === 1) {
        if (userAnswer[1] !== 5) {
          groups = [(parseInt(userAnswer[1])+1)]
        } 
        questionList = await questionListCall()
      } else {
        navigate(PATH_URL.UPLOAD_IJAZAH, { replace: true })
      }
    } catch(e) {
      console.log(`e`, e)
      notifications.danger(e.message)
    }
  }

  let rangeQuestion = true;

</script>

<div class="flex flex-wrap w-full h-full">
  <div class="flex w-full p-4 align-center">

    <main class="max-w-3xl px-4 mx-auto my-24 sm:mt-12 sm:px-6 md:mt-16 lg:my-24 lg:px-8">
      <div class="sm:text-center lg:text-left">
        
        <div class="sticky top-0 pt-6 bg-white">
          <a href="/" class="flex items-center mb-8">
            <i class="mr-4 fas fa-arrow-left"></i>
            <p class="text-base">Kembali ke halaman utama</p>
          </a>
          <img class="object-cover w-64 h-full mb-4" src={Images.logo_poltekkes} alt="">
          <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-3xl">
            <span class="block xl:inline">KUISIONER TRACER STUDY/PENGGUNA ALUMNI</span>
          </h1>
          
          <hr class="my-8 md:min-w-full" />
        </div>

        <div class="">
          {#each questionList.getQuestionGroupList() as group}
            
          <h2 class="block mb-4 mb-8 font-bold text-blue-700">{group.getTitle()}</h2>

            {#each group.getQuestionList() as question}
              <div class="mb-12">
                
                <p class="mb-4 text-xl font-semibold text-black">{question.getTitle()}</p>

                <div class={question.getMinimumValue() && question.getMaximumValue() ? "flex justify-between mt-6 items-center" : "mt-2 space-y-4"}>
                  
                  {#if question.getQuestionType() === 1}
                    <input on:change="{(event) => changeAnswer(event, question.getId())}" type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
                  {:else if  question.getQuestionType() === 2}

                    {#if question.getMinimumValue() && question.getMaximumValue() }
                      <span>{question.getMinimumValue()}</span>
                    {/if}

                    {#each question.getQuestionOptionList() as questionOption, i}
                      <div class="flex items-center">
                        <input checked={userAnswer[question.getId()] == questionOption.getId()} on:change="{(event) => changeAnswer(event, question.getId())}" id={`radio-${question.getId()}-${i}`} name={`radio-${question.getId()}-${i}`} type="radio" value="{questionOption.getId()}" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">

                        <div class="flex items-center w-full">
                          <label for={`radio-${question.getId()}-${i}`} class="block max-w-xl ml-3 text-sm font-medium text-gray-700 cursor-pointer w-max min-w-max">
                            {questionOption.getTitle()} 
                          </label>
                          {#if questionOption.getIsNeedEssay()}
                            <input type="text" class="block w-full px-4 py-2 ml-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
                          {/if}
                        </div>

                      </div>
                    {/each}

                    {#if question.getMinimumValue() && question.getMaximumValue() }
                        <span>{question.getMaximumValue()}</span>
                    {/if}
                    
                  {:else if  question.getQuestionType() === 3}
                    {#each question.getQuestionOptionList() as questionOption, i}
                      <div class="flex items-start">
                        <div class="flex items-center h-5">
                          <input value={questionOption.getId()} on:change="{(event) => changeAnswer(event, question.getId(), true)}" id={`check-${question.getId()}-${i}`} name={`check-${question.getId()}-${i}`} type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                        </div>
                        <div class="ml-3 text-sm">
                          <label for={`check-${question.getId()}-${i}`} class="font-medium text-gray-700 cursor-pointer">{questionOption.getTitle()}</label>
                        </div>
                      </div>
                    {/each}
                  {/if}
                </div>
              </div>
            {/each}
          {:else}
            <!-- this block renders when photos.length === 0 -->
            <p>loading...</p>
          {/each}
        
          
          <div class="px-4 py-3 mt-10 text-right bg-gray-50 sm:px-6">
            <button on:click="{lanjutkan}" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Lanjutkan
            </button>
          </div>
        </div>

      </div>
    </main>

  </div>
</div>