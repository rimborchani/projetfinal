/**
 * Client côté navigateur pour gérer les leçons via l'API
 */
export class LessonClient {
  
  /**
   * Récupère toutes les leçons via l'API
   */
  static async getAllLessons() {
    try {
      const response = await fetch('/api/lessons');
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error || 'Erreur lors de la récupération des leçons');
      }
    } catch (error) {
      console.error('Erreur API getAllLessons:', error);
      throw error;
    }
  }

  /**
   * Récupère une leçon spécifique par son ID via l'API
   */
  static async getLesson(id) {
    try {
      const response = await fetch(`/api/lessons/${id}`);
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error || 'Erreur lors de la récupération de la leçon');
      }
    } catch (error) {
      console.error('Erreur API getLesson:', error);
      throw error;
    }
  }

  /**
   * Crée une nouvelle leçon via l'API
   */
  static async createLesson(titre, concept, preview, step1, step2, step3, step4) {
    try {
      const response = await fetch('/api/lessons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titre,
          concept,
          preview,
          step1,
          step2,
          step3,
          step4
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error || 'Erreur lors de la création de la leçon');
      }
    } catch (error) {
      console.error('Erreur API createLesson:', error);
      throw error;
    }
  }

  /**
   * Met à jour une leçon existante via l'API
   */
  static async updateLesson(id, titre, concept, preview, step1, step2, step3, step4) {
    try {
      const response = await fetch(`/api/lessons/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titre,
          concept,
          preview,
          step1,
          step2,
          step3,
          step4
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error || 'Erreur lors de la mise à jour de la leçon');
      }
    } catch (error) {
      console.error('Erreur API updateLesson:', error);
      throw error;
    }
  }

  /**
   * Supprime une leçon via l'API
   */
  static async deleteLesson(id) {
    try {
      const response = await fetch(`/api/lessons/${id}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (result.success) {
        return true;
      } else {
        throw new Error(result.error || 'Erreur lors de la suppression de la leçon');
      }
    } catch (error) {
      console.error('Erreur API deleteLesson:', error);
      throw error;
    }
  }
}
