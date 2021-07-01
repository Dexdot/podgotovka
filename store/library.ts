import { createContext } from 'react';
import { action, makeAutoObservable } from 'mobx';

import {
  CategoryI,
  CreateCategoryI,
  CreateMaterialI,
  MaterialI,
  UpdateCategoryI,
  UpdateMaterialI
} from '@/types/library';

import { LibraryAPI } from '@/api/library';

import { showAlert } from '@/utils/network';

export class LibraryStore {
  public categories: CategoryI[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  private upd = (newCategories: CategoryI[]): void => {
    this.categories = newCategories;
  };

  fetchCategories = (searchParams: {
    subject_id: number;
    q?: string;
  }): void => {
    LibraryAPI.fetch(searchParams).then(
      action('fetchSuccess', ({ data }) => {
        this.upd(data);
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };

  createCategory = (category: CreateCategoryI): void => {
    LibraryAPI.createCategory(category).then(
      action('fetchSuccess', ({ data }) => {
        this.upd([...this.categories, data]);
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };

  updateCategory = (category: UpdateCategoryI): void => {
    LibraryAPI.updateCategory(category).then(
      action('fetchSuccess', ({ data }) => {
        const newCategories = this.categories.map((item) => {
          if (item.id === data.id) {
            return data;
          }
          return item;
        });
        this.upd(newCategories);
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };

  removeCategory = (category_id: number): void => {
    LibraryAPI.removeCategory({ category_id }).then(
      action('fetchSuccess', ({ data }) => {
        if (data.result) {
          const newCategories = this.categories.filter(
            (item) => item.id !== category_id
          );
          this.upd(newCategories);
        } else {
          showAlert({ type: 'error', text: 'Не удалось удалить категорию' });
        }
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };

  createMaterial = (material: CreateMaterialI): void => {
    LibraryAPI.createMaterial(material).then(
      action('fetchSuccess', ({ data }) => {
        const newCategories = this.categories.map((item) => {
          if (item.id === material.category_id) {
            return { ...item, materials: [...item.materials, data] };
          }
          return item;
        });
        this.upd(newCategories);
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };

  removeMaterial = (material_id: number): void => {
    LibraryAPI.removeMaterial({ material_id }).then(
      action('fetchSuccess', ({ data }) => {
        if (data.result) {
          const newCategories = this.categories.map((item) => {
            return {
              ...item,
              materials: item.materials.filter(
                (material) => material.id !== material_id
              )
            };
          });
          this.upd(newCategories);
        } else {
          showAlert({ type: 'error', text: 'Не удалось удалить материал' });
        }
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };

  updateMaterial = (updatedMaterial: UpdateMaterialI): void => {
    LibraryAPI.updateMaterial(updatedMaterial).then(
      action('fetchSuccess', ({ data }) => {
        const newCategories = this.categories.map((item) => {
          const newCategory = {
            ...item,
            materials: item.materials.map((material) => {
              if (material.id === data.id) {
                return data;
              }
              return material;
            })
          };
          return newCategory;
        });
        this.upd(newCategories);
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };

  updateMaterialStatus = (material_id: number): void => {
    LibraryAPI.changeMaterialStatus({ material_id }).then(
      action('fetchSuccess', ({ data }) => {
        if (data.result) {
          const newCategories = this.categories.map((item) => {
            const newCategory = {
              ...item,
              materials: item.materials.map((material) => {
                if (material.id === material_id) {
                  return { ...material, is_published: !material.is_published };
                }
                return material;
              })
            };
            return newCategory;
          });
          this.upd(newCategories);
        } else {
          showAlert({
            type: 'error',
            text: 'Не удалось изменить статус материала'
          });
        }
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };

  copyMaterial = (material_id: number): void => {
    LibraryAPI.copyMaterial({ material_id }).then(
      action('fetchSuccess', ({ data }) => {
        const newCategories = this.categories.map((item) => {
          if (item.materials.find((material) => material.id === material_id)) {
            return { ...item, materials: [...item.materials, data] };
          }
          return item;
        });
        this.upd(newCategories);
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };

  reorderMaterials = (args: {
    orderedMaterials: MaterialI[];
    category_id: number;
  }): void => {
    const id_order_list = args.orderedMaterials.map((item) => item.id);
    LibraryAPI.orderMaterials({
      category_id: args.category_id,
      id_order_list
    }).then(
      action('fetchSuccess', ({ data }) => {
        if (data) {
          const newCategories = this.categories.map((item) => {
            if (args.category_id === item.id) {
              return { ...item, materials: args.orderedMaterials };
            }
            return item;
          });
          this.upd(newCategories);
        } else {
          showAlert({ type: 'error', text: 'Не удалось изменить порядок' });
        }
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };
}

export const libraryStore = new LibraryStore();
export const UsersContext = createContext<LibraryStore>(libraryStore);
