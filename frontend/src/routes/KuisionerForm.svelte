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
  import { userStore } from '../stores/user'
  import UserAnswerService from '../services/user_answer'
  import { token } from '../stores/token';
  
  let groups  = [1];
  const userAnswer = [];
  
  const questionGroupListInputProto = new QuestionGroupListInput()
  let questionList = new QuestionGroupList()
  
  async function questionListCall(){
    console.log('question list', $token)
    var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			},
      'token': 'asal'
		}
    questionGroupListInputProto.setQuestionGroupIdList(groups)
    const question = new QuestionService(deps, questionGroupListInputProto)
    return await question.list()
	}

  async function userAnswerCall(){
    var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			},
      token: $token
		}

    const userId = JSON.parse($userStore).array[0]
    
    let promises = [];
    userAnswer.forEach((answer, questionId) => {
      const userAnswerProto = new UserAnswer()
      userAnswerProto.setUserId(userId)
      userAnswerProto.setQuestionId(questionId)
      userAnswerProto.setAnswer(answer)

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

  const changeAnswer = (event, questionId) => {
    userAnswer[questionId] = event.currentTarget.value
    console.log(questionId, userAnswer[questionId])
  }

  const validateAnswer = () => {
    let result = true;
    questionList.getQuestionGroupList().forEach(group => {
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
      notifications.danger(e.message)
    }
  }

</script>

<div class="flex flex-wrap w-full h-full">
  <div class="flex w-full p-4 align-center">

    <main class="max-w-full px-4 mx-auto my-24 sm:mt-12 sm:px-6 md:mt-16 lg:my-24 lg:px-8">
      <div class="sm:text-center lg:text-left">
        <a href="/" class="flex items-center mb-8">
          <i class="mr-4 fas fa-arrow-left"></i>
          <p class="text-base">Kembali ke halaman utama</p>
        </a>
        <img class="object-cover w-64 h-full mb-4" src={Images.logo_poltekkes} alt="">
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-3xl">
          <span class="block xl:inline">KUISIONER TRACER STUDY/PENGGUNA ALUMNI</span>
        </h1>
        
        <hr class="my-8 md:min-w-full" />

        <div class="overflow-hidden">
          {#each questionList.getQuestionGroupList() as group}
            <h2>{group.getTitle()}</h2>
            {#each group.getQuestionList() as question}
              <div>
                <p class="text-xl font-semibold text-black">{question.getTitle()}</p>
                <div class="mt-4 space-y-4">

                  {#if question.getQuestionType() === 1}
                    <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
                  {:else if  question.getQuestionType() === 2}
                    {#if question.getMinimumValue() && question.getMaximumValue() }
                      <span>{question.getMinimumValue()}</span>
                    {/if}
                    {#each question.getQuestionOptionList() as questionOption}
                      <div class="flex items-center">
                        <input on:change="{(event) => changeAnswer(event, question.getId())}" id="push-everything" name="push-notifications" type="radio" value="{questionOption.getId()}" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                        <label for="push-everything" class="block ml-3 text-sm font-medium text-gray-700">
                          {questionOption.getTitle()} 
                        </label>
                        {#if questionOption.getIsNeedEssay()}
                          <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
                        {/if}
                      </div>
                    {/each}
                    {#if question.getMinimumValue() && question.getMaximumValue() }
                      <span>{question.getMaximumValue()}</span>
                    {/if}
                  {:else if  question.getQuestionType() === 3}
                    {#each question.getQuestionOptionList() as questionOption}
                      <div class="flex items-start">
                        <div class="flex items-center h-5">
                          <input id="comments" name="comments" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                        </div>
                        <div class="ml-3 text-sm">
                          <label for="comments" class="font-medium text-gray-700">{questionOption.getTitle()}</label>
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
        
          
          <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
            <button on:click="{lanjutkan}" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Lanjutkan
            </button>
          </div>
        </div>

      </div>
    </main>

  </div>
</div>