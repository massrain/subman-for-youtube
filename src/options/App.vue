<template>
    <div>
        <nav class="level">
            <div class="level-item has-text-centered">
                <div>
                    {{ state }}
                    <input class="input"
                           v-model="category"
                           @keyup.enter.prevent="addCategory"
                           type="text"
                           placeholder="Add New Category">
                </div>
            </div>
        </nav>

        <category v-for="(category, index) in categories"
                  @category-removed="deleteCategory(index)"
                  @subscriptions-updated="syncCategories()"
                  :key="category.slug"
                  :data="category"></category>
    </div>
</template>

<script>
    import Category from './Category';
    import slug from 'slug'

    export default {
        name: "App",
        components: {
            Category
        },
        data: function () {
            return {
                items: [],
                category: '',
                categories: []
            }
        },
        watch: {
            categories(newCategories) {
                chrome.storage.sync.set({categories: newCategories});
                // console.log(newCategories);
            }
        },
        computed: {
            categorySlug() {
                return slug(this.category);
            },
            state() {
                chrome.storage.sync.get('STATE_AUTHORIZED', function(result) {

                    if (result.STATE_AUTHORIZED) {
                        return 'yeap';
                    }

                    return 'nope';
                });
            }
        },
        methods: {
            addCategory() {
                this.categories.push({
                    slug: this.categorySlug,
                    name: this.category,
                    subscriptions: []
                });

                this.category = '';
            },

            deleteCategory(id) {
                this.categories.splice(id, 1);
            },
            syncCategories() {
                chrome.storage.sync.set({categories: this.categories}, function() {});
            }
        },
        mounted() {
            let self = this;
            chrome.storage.sync.get('categories', function(result) {

                if (result.categories) {
                    self.categories = result.categories;

                    return;
                }

                self.categories = [];
            });
        }
    };
</script>

<style lang="sass">
    /*@import "~bulma"*/
</style>
