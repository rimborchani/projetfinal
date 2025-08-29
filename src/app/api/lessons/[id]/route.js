export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import memoryStorage from '../../../../lib/memoryStorage';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const lessonId = parseInt(id);

    // Base de données SQLite avec Prisma
    try {
      const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId }
      });
      
      if (lesson) {
        const data = memoryStorage.transformLesson({
          id: lesson.id,
          titre: lesson.titre,
          concept: lesson.concept,
          preview: lesson.preview,
          step1: lesson.step1,
          step2: lesson.step2,
          step3: lesson.step3,
          step4: lesson.step4,
          correctCode: lesson.correctCode || '' // Include correctCode field
        });
        return NextResponse.json({ success: true, data, source: 'database' });
      }
    } catch (e) {
      console.error('❌ DB GET by id erreur:', e.message);
    }
    
    // Fallback vers le stockage mémoire
    console.log(`💾 Recherche de la leçon ${lessonId} en mémoire`);
    const lesson = memoryStorage.getLesson(lessonId);
    
    if (!lesson) {
      return NextResponse.json(
        { success: false, error: 'Leçon non trouvée' },
        { status: 404 }
      );
    }

    const transformedLesson = memoryStorage.transformLesson(lesson);
    return NextResponse.json({ success: true, data: transformedLesson, source: 'memory' });
  } catch (error) {
    console.error('❌ Erreur lors de la récupération de la leçon:', error);
    return NextResponse.json(
      { success: false, error: 'Impossible de récupérer la leçon' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const lessonId = parseInt(id);
    const body = await request.json();
    const { titre, concept, preview, step1, step2, step3, step4, correctCode } = body;
    
    if (!titre || !step1 || !step2 || !step3 || !step4) {
      return NextResponse.json(
        { success: false, error: 'Tous les champs sont obligatoires' },
        { status: 400 }
      );
    }

    // Base de données SQLite avec Prisma
    try {
      const updatedLesson = await prisma.lesson.update({
        where: { id: lessonId },
        data: {
          titre,
          concept,
          preview,
          step1,
          step2,
          step3,
          step4,
          correctCode: correctCode || ''
        }
      });
      
      if (updatedLesson) {
        const data = memoryStorage.transformLesson({
          id: updatedLesson.id,
          titre: updatedLesson.titre,
          concept: updatedLesson.concept,
          preview: updatedLesson.preview,
          step1: updatedLesson.step1,
          step2: updatedLesson.step2,
          step3: updatedLesson.step3,
          step4: updatedLesson.step4,
          correctCode: updatedLesson.correctCode || ''
        });
        return NextResponse.json({ success: true, data, source: 'database' });
      }
    } catch (e) {
      if (e.code === 'P2025') {
        return NextResponse.json(
          { success: false, error: 'Leçon non trouvée' },
          { status: 404 }
        );
      }
      console.error('❌ DB PUT erreur:', e.message);
    }
    
    // Fallback vers le stockage mémoire
    console.log(`💾 Mise à jour de la leçon ${lessonId} en mémoire`);
    const updatedLesson = memoryStorage.updateLesson(lessonId, titre, concept, preview, step1, step2, step3, step4);
    
    if (!updatedLesson) {
      return NextResponse.json(
        { success: false, error: 'Leçon non trouvée' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: updatedLesson, source: 'memory' });
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour de la leçon:', error);
    return NextResponse.json(
      { success: false, error: 'Impossible de mettre à jour la leçon' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const lessonId = parseInt(id);
    const body = await request.json();
    const { correctCode } = body;
    
    if (correctCode === undefined) {
      return NextResponse.json(
        { success: false, error: 'Le champ correctCode est requis pour la mise à jour partielle' },
        { status: 400 }
      );
    }

    // Base de données SQLite avec Prisma
    try {
      const updatedLesson = await prisma.lesson.update({
        where: { id: lessonId },
        data: {
          correctCode: correctCode || ''
        }
      });
      
      if (updatedLesson) {
        console.log('✅ Code de référence mis à jour pour la leçon ID:', lessonId);
        return NextResponse.json({ 
          success: true, 
          message: 'Code de référence mis à jour avec succès',
          data: {
            id: updatedLesson.id,
            correctCode: updatedLesson.correctCode
          },
          source: 'database' 
        });
      }
    } catch (e) {
      if (e.code === 'P2025') {
        return NextResponse.json(
          { success: false, error: 'Leçon non trouvée' },
          { status: 404 }
        );
      }
      console.error('❌ DB PATCH erreur:', e.message);
    }
    
    // Fallback vers le stockage mémoire (pas d'implémentation pour correctCode dans memoryStorage)
    console.log(`💾 Mise à jour partielle non supportée en mémoire pour la leçon ${lessonId}`);
    return NextResponse.json(
      { success: false, error: 'Mise à jour partielle non supportée en mode mémoire' },
      { status: 501 }
    );
    
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour partielle de la leçon:', error);
    return NextResponse.json(
      { success: false, error: 'Impossible de mettre à jour le code de référence' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const lessonId = parseInt(id);
    
    // Base de données SQLite avec Prisma
    try {
      await prisma.lesson.delete({
        where: { id: lessonId }
      });
      return NextResponse.json({ success: true, message: 'Leçon supprimée avec succès', source: 'database' });
    } catch (e) {
      if (e.code === 'P2025') {
        return NextResponse.json(
          { success: false, error: 'Leçon non trouvée' },
          { status: 404 }
        );
      }
      console.error('❌ DB DELETE erreur:', e.message);
    }

    // Fallback vers le stockage mémoire
    console.log(`💾 Suppression de la leçon ${lessonId} de la mémoire`);
    const deleted = memoryStorage.deleteLesson(lessonId);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Leçon non trouvée' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Leçon supprimée avec succès', source: 'memory' });
  } catch (error) {
    console.error('❌ Erreur lors de la suppression de la leçon:', error);
    return NextResponse.json(
      { success: false, error: 'Impossible de supprimer la leçon' },
      { status: 500 }
    );
  }
}
