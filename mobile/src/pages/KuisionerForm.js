import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text, Button} from 'react-native-elements';
import {getQuestionList} from '../utils/actions';
import InputBorderer from '../components/InputBorderer';
import CheckBoxClear from '../components/CheckBoxClear';

const KuisionerForm = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLogin, questionList} = useSelector(state => ({
    isLogin: state.isLogin,
    questionList: state.questionList,
  }));
  useEffect(() => {
    dispatch(getQuestionList());
  }, []);
  const renderAnswerByType = question => {
    switch (question.questionType) {
      case 1:
        return (
          <InputBorderer label="Instansi" onChangeText={e => console.log(e)} />
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
                    // checked={statusALumni === 'alumni'}
                    // onPress={() => setStatusAlumni('alumni')}
                  />
                );
              })}
          </>
        );
      case 3:
        return (
          <View>
            <Text>TIPE 3</Text>
          </View>
        );
    }
  };
  console.log('ASU = ', questionList);
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
          {questionList.length > 0 &&
            questionList.map((group, idx) => {
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
                        <View key={quest.id || id}>
                          <Text style={{fontWeight: 'bold', fontSize: 16}}>
                            {quest.title}
                          </Text>
                          {renderAnswerByType(quest)}
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
          // loading={isLoading}
          onPress={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default KuisionerForm;
