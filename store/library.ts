import { createContext } from 'react';
import { action, makeAutoObservable } from 'mobx';

import { LoadingStateType } from '@/types/common';
import {
  CategoryI,
  CreateCategoryI,
  CreateMaterialI,
  MaterialDetailI,
  MaterialI,
  UpdateCategoryI,
  UpdateMaterialI
} from '@/types/library';

import { LibraryAPI } from '@/api/library';

import { showAlert } from '@/utils/network';

export class LibraryStore {
  public categories: CategoryI[] = [];

  public material: MaterialDetailI = {} as MaterialDetailI;

  public loading: LoadingStateType = 'done';

  public loadingMaterial: LoadingStateType = 'done';

  constructor() {
    makeAutoObservable(this);
  }

  private upd = (newCategories: CategoryI[]): void => {
    this.categories = newCategories;
  };

  private updMaterial = (newMaterial: MaterialDetailI): void => {
    this.material = newMaterial;
  };

  updateMaterialName = (newName: string): void => {
    this.material.name = newName;
  };

  fetchCategories = (searchParams: {
    subject_id: number;
    q?: string;
  }): void => {
    this.loading = 'loading';
    LibraryAPI.fetch(searchParams).then(
      action('fetchSuccess', ({ data }) => {
        this.loading = 'done';
        this.upd(data);
      }),
      action('fetchError', (error) => {
        this.loading = 'error';
        showAlert({ error });
      })
    );
  };

  createCategory = (category: CreateCategoryI): Promise<CategoryI> => {
    return new Promise((res, rej) => {
      LibraryAPI.createCategory(category).then(
        action('fetchSuccess', ({ data }) => {
          this.upd([...this.categories, { ...data, materials: [] }]);
          res(data);
        }),
        action('fetchError', (error) => {
          showAlert({ error });
          rej();
        })
      );
    });
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

  removeCategory = (category_id: number): Promise<void> => {
    return new Promise((res, rej) => {
      LibraryAPI.removeCategory({ category_id }).then(
        action('fetchSuccess', ({ data }) => {
          if (data.result) {
            const newCategories = this.categories.filter(
              (item) => item.id !== category_id
            );
            this.upd(newCategories);
            res();
          } else {
            showAlert({ type: 'error', text: 'Не удалось удалить категорию' });
            rej();
          }
        }),
        action('fetchError', (error) => {
          showAlert({ error });
          rej();
        })
      );
    });
  };

  fetchMaterial = (material_id: number): Promise<MaterialDetailI> => {
    return new Promise((res, rej) => {
      this.loadingMaterial = 'loading';
      LibraryAPI.fetchMaterialDetail({ material_id }).then(
        action('fetchSuccess', ({ data }) => {
          this.updMaterial(data);
          this.loadingMaterial = 'done';
          res(data);
        }),
        action('fetchError', (error) => {
          showAlert({ error });
          this.loadingMaterial = 'error';
          rej();
        })
      );
    });
  };

  createMaterial = (material: CreateMaterialI): Promise<MaterialDetailI> => {
    return new Promise((res, rej) => {
      this.loadingMaterial = 'loading';
      LibraryAPI.createMaterial(material).then(
        action('fetchSuccess', ({ data }) => {
          const newCategories = this.categories.map((item) => {
            if (item.id === material.category_id) {
              return { ...item, materials: [...item.materials, data] };
            }
            return item;
          });
          this.upd(newCategories);
          this.updMaterial(data);
          this.loadingMaterial = 'done';
          res(data);
        }),
        action('fetchError', (error) => {
          showAlert({ error });
          this.loadingMaterial = 'error';
          rej();
        })
      );
    });
  };

  removeMaterial = (material_id: number): Promise<void> => {
    return new Promise((res, rej) => {
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
            res();
          } else {
            showAlert({ type: 'error', text: 'Не удалось удалить материал' });
            rej();
          }
        }),
        action('fetchError', (error) => {
          showAlert({ error });
          rej();
        })
      );
    });
  };

  updateMaterial = (updatedMaterial: UpdateMaterialI): Promise<void> => {
    return new Promise((res, rej) => {
      this.loadingMaterial = 'loading';
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
          this.updMaterial(data);
          this.loadingMaterial = 'done';
          res();
        }),
        action('fetchError', (error) => {
          showAlert({ error });
          this.loadingMaterial = 'error';
          rej();
        })
      );
    });
  };

  updateMaterialStatus = (material_id: number): Promise<void> => {
    return new Promise((res, rej) => {
      LibraryAPI.changeMaterialStatus({ material_id }).then(
        action('fetchSuccess', ({ data }) => {
          if (data.result) {
            const newCategories = this.categories.map((item) => {
              const newCategory = {
                ...item,
                materials: item.materials.map((material) => {
                  if (material.id === material_id) {
                    return {
                      ...material,
                      is_published: !material.is_published
                    };
                  }
                  return material;
                })
              };
              return newCategory;
            });
            this.upd(newCategories);
            this.updMaterial({
              ...this.material,
              is_published: !this.material.is_published
            });
            res();
          } else {
            showAlert({
              type: 'error',
              text: 'Не удалось изменить статус материала'
            });
            rej();
          }
        }),
        action('fetchError', (error) => {
          showAlert({ error });
        })
      );
    });
  };

  copyMaterial = (material_id: number): Promise<MaterialDetailI> => {
    return new Promise((res, rej) => {
      this.loadingMaterial = 'loading';
      LibraryAPI.copyMaterial({ material_id }).then(
        action('fetchSuccess', ({ data }) => {
          const newCategories = this.categories.map((item) => {
            if (
              item.materials.find((material) => material.id === material_id)
            ) {
              return { ...item, materials: [...item.materials, data] };
            }
            return item;
          });
          this.upd(newCategories);
          this.updMaterial(data);
          this.loadingMaterial = 'done';
          res(data);
        }),
        action('fetchError', (error) => {
          showAlert({ error });
          this.loadingMaterial = 'error';
          rej();
        })
      );
    });
  };

  reorderMaterials = (args: {
    orderedMaterials: MaterialI[];
    category_id: number;
  }): void => {
    const id_order_list = args.orderedMaterials.map((item) => item.id);

    const fallbackCategories = [...this.categories];

    const newCategories = this.categories.map((item) => {
      if (args.category_id === item.id) {
        return { ...item, materials: args.orderedMaterials };
      }
      return item;
    });
    this.upd(newCategories);

    LibraryAPI.orderMaterials({
      category_id: args.category_id,
      id_order_list
    }).then(
      action('fetchSuccess', ({ data }) => {
        if (!data) {
          this.upd(fallbackCategories);
          showAlert({ type: 'error', text: 'Не удалось изменить порядок' });
        }
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };

  reorderMaterialsBetweenCategories = (args: {
    material_id: number;
    category_id: number;
    position: number;
  }): void => {
    const { material_id, category_id, position } = args;
    const fallbackCategories = [...this.categories];

    let filteredMaterial: MaterialI;
    let id_order_list: number[];

    const newCategories = this.categories
      .map((item) => {
        const newMaterials = item.materials.filter((material) => {
          if (material.id === material_id) {
            filteredMaterial = material;
            return false;
          }
          return true;
        });
        return { ...item, materials: newMaterials };
      })
      .map((item) => {
        const newMaterials = [...item.materials];
        if (item.id === category_id) {
          newMaterials.splice(position, 0, filteredMaterial);
          id_order_list = newMaterials.map(({ id }) => id);
        }
        return { ...item, materials: newMaterials };
      });
    this.categories = newCategories;

    LibraryAPI.updateMaterial({ material_id, category_id }).then(
      action('fetchSuccess', ({ data }) => {
        this.updMaterial(data);
        LibraryAPI.orderMaterials({ category_id, id_order_list }).then(
          action('fetchSuccess', ({ data: res }) => {
            if (!res) {
              this.upd(fallbackCategories);
              showAlert({ type: 'error', text: 'Не удалось изменить порядок' });
            }
          }),
          action('fetchError', (error) => {
            showAlert({ error });
          })
        );
      }),
      action('fetchError', (error) => {
        showAlert({ error });
        this.upd(fallbackCategories);
      })
    );
  };
}

export const libraryStore = new LibraryStore();
export const LibraryContext = createContext<LibraryStore>(libraryStore);
