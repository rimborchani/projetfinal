import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// GET /api/lessons-prisma - Get all lessons using Prisma
export async function GET() {
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: {
        id: 'asc'
      }
    });

    // Transform to match your existing format
    const transformedLessons = lessons.map(lesson => ({
      id: lesson.id,
      title: lesson.titre,
      concept: lesson.concept,
      preview: lesson.preview,
      tasks: [
        { 
          id: 1, 
          instruction: lesson.step1, 
          blockType: 'event_whenflagclicked', 
          category: 'Events',
          hint: 'Commencez par cliquer sur le drapeau vert!'
        },
        { 
          id: 2, 
          instruction: lesson.step2, 
          blockType: 'motion_movesteps', 
          category: 'Motion',
          hint: 'Utilisez les blocs de mouvement pour déplacer votre personnage.'
        },
        { 
          id: 3, 
          instruction: lesson.step3, 
          blockType: 'control_repeat', 
          category: 'Control',
          hint: 'Les boucles vous permettent de répéter des actions.'
        },
        { 
          id: 4, 
          instruction: lesson.step4, 
          blockType: 'looks_say', 
          category: 'Looks',
          hint: 'Ajoutez des dialogues pour rendre votre animation plus vivante.'
        }
      ]
    }));

    return NextResponse.json({
      success: true,
      data: transformedLessons,
      source: 'prisma'
    });
  } catch (error) {
    console.error('Prisma GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch lessons' },
      { status: 500 }
    );
  }
}

// POST /api/lessons-prisma - Create a new lesson using Prisma
export async function POST(request) {
  try {
    const body = await request.json();
    const { titre, concept, preview, step1, step2, step3, step4 } = body;

    if (!titre || !step1 || !step2 || !step3 || !step4) {
      return NextResponse.json(
        { success: false, error: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    const lesson = await prisma.lesson.create({
      data: {
        titre,
        concept: concept || '',
        preview: preview || '',
        step1,
        step2,
        step3,
        step4,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: lesson.id,
        title: lesson.titre,
        concept: lesson.concept,
        preview: lesson.preview,
        tasks: [
          { id: 1, instruction: lesson.step1, blockType: 'event_whenflagclicked', category: 'Events' },
          { id: 2, instruction: lesson.step2, blockType: 'motion_movesteps', category: 'Motion' },
          { id: 3, instruction: lesson.step3, blockType: 'control_repeat', category: 'Control' },
          { id: 4, instruction: lesson.step4, blockType: 'looks_say', category: 'Looks' }
        ]
      },
      source: 'prisma'
    }, { status: 201 });
  } catch (error) {
    console.error('Prisma POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create lesson' },
      { status: 500 }
    );
  }
}
