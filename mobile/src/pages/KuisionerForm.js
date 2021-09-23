import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text, Button} from 'react-native-elements';
import {getQuestionList} from '../utils/actions';
import InputBorderer from '../components/InputBorderer';
import CheckBoxClear from '../components/CheckBoxClear';
import storage from '../utils/storage';
import {PAGES} from '../routes';
import {
  userAnswerCall,
  tracerCreateCall,
  resetQuestion,
} from '../utils/actions';
import user from '../../services/user';

const KuisionerForm = ({navigation}) => {
  const [groups, setGroups] = useState([1]);
  const [tracerId, setTracerId] = useState(null);
  const dispatch = useDispatch();
  const {isLogin, questionList} = useSelector(state => ({
    isLogin: state.isLogin,
    questionList: state.questionList,
  }));
  const [userAnswer, setUserAnswer] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    dispatch(getQuestionList(groups));

    return () => {
      dispatch(resetQuestion());
    };
  }, []);

  useEffect(() => {
    if (questionList && questionList.length > 0) {
      console.log('questionList', questionList);
      setQuestions(questionList);
      setReRender(!reRender);
    }
  }, [questionList]);

  const changeAnswer = (value, questionId, answerTitle, isMultiple) => {
    console.log(userAnswer);
    console.log('questionList', questionList);
    const answer = {
      id: value,
      text: answerTitle,
    };
    if (isMultiple) {
      if (!userAnswer[questionId]) {
        let temp = [];
        temp.push(answerTitle);
        // userAnswer[questionId] = temp;
        let ans = userAnswer;
        ans[questionId] = temp;
        setUserAnswer(ans);
      } else {
        console.log('userAnswer', userAnswer);
        console.log('userAnswer[questionId]', userAnswer[questionId]);
        let temp = userAnswer[questionId];
        let value = answerTitle;
        // let isChecked = event.target.checked;
        if (temp.indexOf(answerTitle) === -1) {
          temp.push(answerTitle);
        } else {
          temp.splice(temp.indexOf(answerTitle), 1);
        }
        // userAnswer[questionId] = temp;
        let ans = userAnswer;
        ans[questionId] = temp;
        setUserAnswer(ans);
      }
    } else {
      // console.log(questionId, event.target.value)
      let ans = userAnswer;
      ans[questionId] = answer;
      setUserAnswer(ans);
    }
    setReRender(!reRender);
    console.log('userAnswer', userAnswer);
  };

  const isCheckedRadio = (question, questionOption) => {
    let flag = false;

    if (userAnswer[question.id] && userAnswer[question.id].id) {
      flag = userAnswer[question.id].id == questionOption.id;
    }

    return flag;
  };

  const isCheckedMultiple = (question, answerTitle) => {
    let flag = false;

    if (userAnswer[question.id] && userAnswer[question.id].length > 0) {
      userAnswer[question.id].forEach(el => {
        if (el.indexOf(answerTitle) !== -1) {
          flag = true;
        }
      });
    }

    return flag;
  };

  const renderAnswerByType = question => {
    switch (question.questionType) {
      case 1:
        return (
          <InputBorderer
            minBorder={true}
            onChangeText={e => changeAnswer(question.id, question.id, e)}
          />
        );
      case 2:
        return (
          <>
            {question.questionOptionList.length > 0 &&
              question.questionOptionList.map((opt, idx) => {
                return (
                  <CheckBoxClear
                    key={opt.id || idx}
                    title={opt.title}
                    // checked={true}
                    checked={isCheckedRadio(question, opt)}
                    onPress={() => changeAnswer(opt.id, question.id, opt.title)}
                    // checked={statusALumni === 'alumni'}
                    // onPress={() => setStatusAlumni('alumni')}
                  />
                );
              })}
          </>
        );
      case 3:
        return (
          <>
            {question.questionOptionList.length > 0 &&
              question.questionOptionList.map((opt, idx) => {
                return (
                  <CheckBoxClear
                    key={opt.id || idx}
                    title={opt.title}
                    // checked={true}
                    isMultiple={true}
                    checked={isCheckedMultiple(question, opt.title)}
                    onPress={() =>
                      changeAnswer(opt.id, question.id, opt.title, true)
                    }
                    // checked={statusALumni === 'alumni'}
                    // onPress={() => setStatusAlumni('alumni')}
                  />
                );
              })}
          </>
        );
    }
  };

  const validateAnswer = () => {
    let result = true;
    questions.forEach(group => {
      console.log('group', group);
      group.questionList.forEach(question => {
        console.log(question.id, userAnswer[question.id]);
        if (!userAnswer[question.id]) {
          result = false;
        }
      });
    });
    return result;
  };

  const lanjutkan = async () => {
    setIsLoading(true);
    let id = tracerId;
    try {
      if (!validateAnswer()) {
        console.log('userAnswer', userAnswer);
        throw {message: 'silahkan jawab kuisioner terlebih dahulu'};
      }

      if (!id) {
        id = await dispatch(tracerCreateCall());
        // setTracerId(tracerResponse.id);
        setTracerId(id);
        // console.log('tracerResponse', tracerResponse);
      }

      const answer = dispatch(userAnswerCall(userAnswer, id));
      console.log('answer', answer);
      console.log('groups', groups);
      if (groups.length === 1 && groups[0] === 1) {
        console.log('userAnswer', userAnswer);
        let group = groups;
        if (userAnswer[1].id !== 5) {
          group = [parseInt(userAnswer[1].id) + 1];
          setGroups(group);
        }
        dispatch(getQuestionList(group));
      } else {
        const token = await storage.load({key: 'token'});
        if (token.usertype == 2) {
          navigation.reset({
            index: 0,
            routes: [{name: PAGES.TAB_LOGIN.path}],
          });
          // navigate(PATH_URL.DASHBOARD, {replace: true});
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: PAGES.ADD_IJAZAH.path}],
          });
          // navigate(PATH_URL.UPLOAD_IJAZAH, {replace: true});
        }
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log('e', e);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          backgroundColor: '#ffffff',
        }}>
        <Text style={{fontSize: 28, fontWeight: 'bold'}}>
          KUISIONER TRACER STUDY/PENGGUNA ALUMNI
        </Text>
        <View style={{paddingTop: 24}}>
          {questions.length > 0 &&
            questions.map((group, idx) => {
              return (
                <View key={group.id || idx}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#3B82F6',
                      fontWeight: 'bold',
                      marginBottom: 24,
                    }}>
                    {group.title}
                  </Text>
                  {group.questionList.length > 0 &&
                    group.questionList.map((quest, id) => {
                      return (
                        <View style={{marginBottom: 28}} key={quest.id || id}>
                          <Text style={{fontWeight: 'bold', fontSize: 16}}>
                            {quest.title}
                          </Text>
                          {reRender
                            ? renderAnswerByType(quest)
                            : renderAnswerByType(quest)}
                        </View>
                      );
                    })}
                </View>
              );
            })}
        </View>
        <Button
          title="Lanjutkan"
          buttonStyle={{
            backgroundColor: '#047857',
            marginTop: 24,
          }}
          loading={isLoading}
          onPress={lanjutkan}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default KuisionerForm;
