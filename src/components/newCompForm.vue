<template>
    <div id="form_comp">
        <form action="#">
            <div>
                <div class="row">
                    <div class="col">
                    <span>Название</span>
                    </div>
                    <div class="col">
                    <input type="text" name="IID" placeholder="Введите имя компании">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <span>Доход</span>
                    </div>
                    <div class="col">
                    <input type="number" pattern="\d*" name="income" placeholder="0">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <span>Доход с лицензий</span>
                    </div>
                    <div class="col">
                    <input type="number" pattern="\d*" name="income_lic" placeholder="0">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <span>Фонд оплаты труда</span>
                    </div>
                    <div class="col">
                    <input type="number" pattern="\d*" name="fot" placeholder="0">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <span>Налог с прибыли</span>
                    </div>
                    <div class="col">
                    <input type="number" pattern="\d*" name="taxesProfit" placeholder="0">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <span>НДС</span>
                    </div>
                    <div class="col">
                    <input type="number" pattern="\d*" name="taxesVAT" placeholder="0">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <span>НДФЛ</span>
                    </div>
                    <div class="col">
                    <input type="number" pattern="\d*" name="taxesEmplSal" placeholder="0">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <span>Страховые сборы</span>
                    </div>
                    <div class="col">
                    <input type="number" pattern="\d*" name="insurance" placeholder="0">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <span>Количество сотрудников</span>
                    </div>
                    <div class="col">
                        <input type="number" pattern="\d*" name="employee_num" placeholder="0">
                    </div>
                </div>

                <slot></slot>

            </div>
        </form>
    </div>
</template>

<script>
</script>
<style scoped>
form{
    margin-block-end:0;
}
</style>