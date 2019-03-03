/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
var http = require("http")

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to the Alexa Skills Kit, you can say hello and begin the Feel Fit demo!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt("Good Morning! Would you like to start off your day with either an inspiring message or a recipe?")
      .getResponse();
  },
};

const recipeIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === "IntentRequest" && request.intent.name === 'recipeIntent';
  },
  handle(handlerInput){
    return handlerInput.responseBuilder
        .speak('insert random recipe here')
        .reprompt("Would you like to hear the ingredients in this recipe?")
        .getResponse();
  },
}

const quoteIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === "IntentRequest" && request.intent.name === 'quoteIntent';
  },
  handle(handlerInput){
    return handlerInput.responseBuilder
        .speak('this is a really deep quote bro')
        .reprompt("would you like to hear a recipe as well?")
        .getResponse();
  },
}
/*
const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
  },
  handle(handlerInput) {
    const speechText = 'Good Morning!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};


const FallbackHandler = {
  canHandle(handlerInput){
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
        request.intent.name === 'AMAZON.FallbackIntent'
  },
  handle(handlerInput){
    return handlerInput.responseBuilder
        .speak('recipe')
        .reprompt('do you want this recipe')
        .getResponse()
  },
};

*/



const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

/*

const jokeOrRecipeHandler = {
  canHandle(handlerInput) {
    let isCurrentlyPlaying = false;
    const request = handlerInput.requestEnvelope.request;
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();

    if (sessionAttributes.gameState && sessionAttributes.gameState === 'STARTED' ){
      isCurrentlyPlaying = true;
    }

    return isCurrentlyPlaying && request.type === 'IntentRequest' && request.intent.name === 'quoteOrRecipeIntent';
    /*return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'jokeOrRecipeIntent';

  },
  async handle(handlerInput) {
    const { requestEnvelope, attributesManager, responseBuilder } = handlerInput;
    const userInput = parse
    /*const speechText = 'Good Morning! Would you like to start off your day with either an inspiring message or a recipe?';

    return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('jokeOrRecipe', speechText)
        .getResponse();

  },
};

*/




const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    recipeIntentHandler,
    quoteIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
