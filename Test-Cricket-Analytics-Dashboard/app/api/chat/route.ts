import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { message, playerName } = await request.json()
    
    // Use the correct model name - gemini-pro is deprecated
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    
    const prompt = `You are a cricket analytics expert. Answer questions about the cricket player ${playerName}. 
    Question: ${message}
    
    Keep your response concise and informative. If you don't know specific statistics,do a deeper search and if you fail, mention that and provide general cricket insights about the player.`
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    return NextResponse.json({ message: text })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ 
      message: 'Sorry, I encountered an error processing your request. Please try again.',
      error: 'Failed to generate response' 
    }, { status: 500 })
  }
}