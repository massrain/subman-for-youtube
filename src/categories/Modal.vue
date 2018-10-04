<template>
    <section>
        <div class="modal fade"
             :class="{'show show-modal': modalVisible}"
             @keydown.esc="toggleModalVisible"
             tabindex="-1" role="dialog"
             aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered  modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Create a new category</h5>
                        <button type="button" class="close"
                                @click.prevent="toggleModalVisible"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-8">
                                <div class="form-group">
                                    <input type="text" autofocus
                                           v-model="category"
                                           @keyup.enter="addCategory"
                                           placeholder="Name"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="col-2">
                                <button type="button"
                                        @click.prevent="addCategory"
                                        class="btn btn-danger">Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="modalVisible" class="modal-backdrop fade"
             :class="{show: modalVisible}"></div>
    </section>
</template>

<script>
    import state from  '../mixins/state'

    export default {
        name: "Modal",
        mixins: [state],
        data: function () {
            return {
                category: ''
            }
        },
        computed: {},
        methods: {
            addCategory() {
                this.insertCategory({
                    name: this.category,
                    subscriptions: []
                });

                this.category = '';

                this.toggleModalVisible();
            }
        },
        mounted() {}
    }
</script>

<style>
    .show-modal {
        display: block !important;
    }
</style>
