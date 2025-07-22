<template>
  <br />
  <router-link to="/" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>

  <q-card class="my-card q-ma-sm col-auto">
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div class="text-h6">Add Activity Log</div>
           <q-btn color="primary text-capitalize" label="Save" icon="save" />
      </div>
      <div class="text-subtitle2">Activity Management</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section class="q-px-none" >
      <div class="q-px-none field-add-tab">
        <div class="row q-col-gutter-md items-center">
          <div class="col-12 col-sm-6 col-md-4 col-lg-12">
            <!-- Date Picker goes here -->

            
            <div class="q-pa-md">
              <q-list bordered class="rounded-borders">
                <q-expansion-item default-opened>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="attractions" color="primary" text-color="white" />
                    </q-item-section>

                    <q-item-section>
                      Account Information
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <ClientSearchSelect 
                            label="Search Account"
                            v-model="selectedClient"
                            @select="onClientSelect" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <ContactPersonSearchSelect 
                            label="Select Contact Person"
                            v-model="selectedContact"
                            :clientId="selectedClient?.id"
                            @select="onContactSelect" />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                
                <q-separator />

                <q-expansion-item default-opened>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="info" color="primary" text-color="white" />
                    </q-item-section>

                    <q-item-section>
                      Activity information
                    </q-item-section>


                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">

                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="selectedActivityType" :options="activityTypes" label="Select Activity Type" @update:model-value="onActivityTypeChange" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="taskName" label="Task Name" :disable="selectedActivityType !== 'Task'" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input 
                            dense 
                            outlined 
                            v-model="location" 
                            label="Location" 
                            :disable="!['Demo', 'Meeting', 'Task'].includes(selectedActivityType)" 
                          />
                        </div>

                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <div class="row q-col-gutter-sm">
                            <div class="col-6">
                              <q-input dense outlined v-model="activityDate" label="Activity Date" :hide-bottom-space="true">
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="activityDate">
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-date>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                            <div class="col-6">
                              <q-input dense outlined v-model="activityTime" label="Activity Time" :hide-bottom-space="true">
                                <template v-slot:append>
                                  <q-icon name="access_time" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-time v-model="activityTime" format24h>
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-time>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                          </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="duration" label="Duration" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select 
                            dense 
                            outlined 
                            v-model="selectedUsers" 
                            :options="users" 
                            option-label="name"
                            multiple
                            use-chips
                            label="Select Users" 
                          />
                        </div>
                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">

                        </div>
                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-checkbox v-model="hasNextActivity" label="Follow up Activity" @update:model-value="onNextActivityChange" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="followUpActivityType" :options="activityTypes" label="Select Follow up activity Type" :disable="!hasNextActivity" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <div class="row q-col-gutter-sm">
                            <div class="col-6">
                              <q-input dense outlined v-model="followUpDate" label="Follow up Date" :disable="!hasNextActivity" :hide-bottom-space="true">
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="followUpDate">
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-date>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                            <div class="col-6">
                              <q-input dense outlined v-model="followUpTime" label="Follow up Time" :disable="!hasNextActivity" :hide-bottom-space="true">
                                <template v-slot:append>
                                  <q-icon name="access_time" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-time v-model="followUpTime" format24h>
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-time>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                          </div>
                        </div>
                        
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-expansion-item default-opened>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="attractions" color="primary" text-color="white" />
                    </q-item-section>

                    <q-item-section>
                      Upload Files
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">
                        <div class="col-12">
                          <q-file
                            v-model="uploadedFiles"
                            label="Upload Files"
                            outlined
                            multiple
                            counter
                            @update:model-value="onFilesSelected"
                          >
                            <template v-slot:prepend>
                              <q-icon name="attach_file" />
                            </template>
                          </q-file>
                        </div>
                      </div>
                      
                      <div class="row q-mt-md" v-if="fileList.length > 0">
                        <div class="col-12">
                          <q-table
                            :rows="fileList"
                            :columns="fileColumns"
                            row-key="id"
                            flat
                            bordered
                          >
                            <template v-slot:body-cell-actions="props">
                              <q-td :props="props" class="text-center">
                                <q-btn flat round icon="delete" color="red" @click="removeFile(props.row.id)" />
                              </q-td>
                            </template>
                          </q-table>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

               <q-expansion-item default-opened>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="attractions" color="primary" text-color="white" />
                    </q-item-section>

                    <q-item-section>
                      Remarks
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      
                      <div class="row q-col-gutter-md items-center">
                        <div class="col-12">
                          <q-input 
                            type="textarea" 
                            outlined 
                            v-model="remarks" 
                            label="Remarks" 
                            autogrow 
                            :rows="4" 
                          />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                
              </q-list>
            </div>
          </div>
        </div>

      </div>
    </q-card-section>
  </q-card>
</template>
<script>
  //import { ref } from 'vue'
  import ClientSearchSelect from '../../components/ClientSearchSelect.vue'
  import ContactPersonSearchSelect from '../../components/ContactPersonSearchSelect.vue'
  
  export default {
    name: 'ActionLogPage',
    components: {
      ClientSearchSelect,
      ContactPersonSearchSelect
    },
    data() {
      return {
        hasNextActivity: false,
        activityTypes: [
          'Call', 'Email', 'Demo', 'Meeting', 'Task'
        ],
        Priority: [
          'High', 'Medium', 'Low' 
        ],
        Timeframe: [
          'Immediate', '1-3 Months', '3-6 Months', '6+ Months'
        ],
        options: [
          'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
        ],
        selectedClient: null,
        selectedContact: null,
        selectedActivityType: null,
        taskName: '',
        location: '',
        activityDate: '',
        activityTime: '',
        duration: '',
        selectedUsers: [],
        followUpDate: '',
        followUpTime: '',
        followUpActivityType: null,
        uploadedFiles: null,
        fileList: [],
        fileColumns: [
          { name: 'name', label: 'File Name', field: 'name', align: 'left' },
          { name: 'size', label: 'Size', field: 'size', align: 'right' },
          { name: 'type', label: 'Type', field: 'type', align: 'left' },
          { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
        ],
        users: [
          { id: 1, name: 'John Smith', email: 'john.smith@example.com' },
          { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@example.com' },
          { id: 3, name: 'Michael Brown', email: 'michael.brown@example.com' },
          { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com' },
          { id: 5, name: 'David Wilson', email: 'david.wilson@example.com' }
        ],
        clients: [
          { id: 1, name: 'John Doe', email: 'john@example.com', company: 'Acme Inc.' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: 'Globex Corp' },
          { id: 3, name: 'Alice Brown', email: 'alice@example.com', company: 'Initech' },
          { id: 4, name: 'Bob Johnson', email: 'bob@example.com', company: 'Umbrella LLC' },
          { id: 5, name: 'Eve Davis', email: 'eve@example.com', company: 'Stark Industries' },
        ],
        columns: [
          { name: 'name', required: true, label: 'Name', align: 'left', field: 'name' },
          { name: 'email', label: 'Email', align: 'left', field: 'email' },
          { name: 'company', label: 'Company', align: 'left', field: 'company' },
        ],
        text: '',
        date: '',
        Number: '',
        message: '',
        remarks: ''
      };
    },
    methods: {
      onClientSelect(client) {
        console.log('Selected client:', client);
      },
      onContactSelect(contact) {
        console.log('Selected contact:', contact);
      },
      onActivityTypeChange(type) {
        console.log('Selected activity type:', type);
        // Clear task name if activity type is not Task
        if (type !== 'Task') {
          this.taskName = '';
        }
        
        // Clear location if activity type is not Demo, Meeting, or Task
        if (!['Demo', 'Meeting', 'Task'].includes(type)) {
          this.location = '';
        }
      },
      onNextActivityChange(value) {
        console.log('Next activity:', value);
        // Clear follow-up fields if next activity is unchecked
        if (!value) {
          this.followUpDate = '';
          this.followUpTime = '';
          this.followUpActivityType = null;
        }
      },
      onFilesSelected(files) {
        if (!files) return;
        
        // Process each file
        const newFiles = Array.from(files).map((file, index) => ({
          id: Date.now() + index,
          name: file.name,
          size: this.formatFileSize(file.size),
          type: file.type || 'Unknown',
          file: file
        }));
        
        // Add to file list
        this.fileList = [...this.fileList, ...newFiles];
      },
      removeFile(id) {
        this.fileList = this.fileList.filter(file => file.id !== id);
      },
      formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      }
    }
  }
</script>